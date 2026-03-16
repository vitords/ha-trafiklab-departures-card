import { LitElement, html, nothing, TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";
import { HomeAssistant } from "custom-card-helpers";

import { AnimateTarget, CanceledStyle, Config, DeparturesDataRow, LayoutCell } from "../types";
import { DEFAULT_LAYOUT, DEFAULT_ARRIVAL_OFFSET } from "../constants";
import { getContrastTextColor } from "../helpers";
import { ANIMATION_PRESETS } from "../animate-presets";
import { buildGridTemplate } from "../data/layout";
import { getLocale } from "../locales";

export abstract class ContentBase extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: Config;
  @property({ attribute: false }) rows: DeparturesDataRow[] = [];
  @state() private _activeAlertRow: number | null = null;

  protected get layout(): LayoutCell[] {
    return (this.config.layout as LayoutCell[]) ?? DEFAULT_LAYOUT;
  }

  protected get gridTemplate(): string {
    return buildGridTemplate(this.layout);
  }

  protected updated(): void {
    this._syncAnimations();
  }

  private _syncAnimations(): void {
    const type = this.config?.departure_animation;
    const preset = type ? ANIMATION_PRESETS[type] : undefined;

    const animTarget = this.config.animate_target ?? AnimateTarget.ICON_TIME;

    this.shadowRoot?.querySelectorAll<HTMLElement>(".departure-row").forEach((row) => {
      const shouldAnimate = row.dataset.arriving === "true" && !!preset;

      const targets: HTMLElement[] = animTarget === AnimateTarget.ROW
        ? [row]
        : [
            animTarget !== AnimateTarget.TIME
              ? row.querySelector<HTMLElement>(".cell-icon")
              : null,
            animTarget !== AnimateTarget.ICON
              ? row.querySelector<HTMLElement>(".cell-time-diff")
              : null,
          ].filter((el): el is HTMLElement => el !== null);

      targets.forEach((el) => {
        if (shouldAnimate) {
          if (!(el as any)._trafiklabAnim) {
            const options = { ...preset!.options };
            const override = this.config.departure_animation_duration;
            if (override) options.duration = override;
            (el as any)._trafiklabAnim = el.animate(preset!.keyframes, options);
          }
        } else {
          if ((el as any)._trafiklabAnim) {
            ((el as any)._trafiklabAnim as Animation).cancel();
            (el as any)._trafiklabAnim = undefined;
          }
        }
      });
    });
  }

  protected renderListHeader(): TemplateResult {
    if (!this.config.show_list_header) return html`${nothing}`;
    return html`
      <div
        class="list-header"
        style=${styleMap({ gridTemplateColumns: this.gridTemplate })}
      >
        ${this.layout.map((cell) => this.renderHeaderCell(cell))}
      </div>
    `;
  }

  private renderHeaderCell(cell: LayoutCell | string): TemplateResult {
    const loc = getLocale(this.hass?.language ?? "en");
    const labels: Record<string, string> = {
      [LayoutCell.ICON]:           "",
      [LayoutCell.LINE]:           loc.col.line,
      [LayoutCell.DESTINATION]:    loc.col.destination,
      [LayoutCell.TIME_DIFF]:      loc.col.time_diff,
      [LayoutCell.PLANNED_TIME]:   loc.col.planned_time,
      [LayoutCell.ESTIMATED_TIME]: loc.col.estimated_time,
      [LayoutCell.DELAY]:          loc.col.delay,
      [LayoutCell.PLATFORM]:       loc.col.platform,
    };
    const rightAligned = new Set([
      LayoutCell.TIME_DIFF,
      LayoutCell.PLANNED_TIME,
      LayoutCell.ESTIMATED_TIME,
      LayoutCell.DELAY,
    ]);
    const centeredAligned = new Set([LayoutCell.PLATFORM]);
    const style = rightAligned.has(cell as LayoutCell)
      ? "text-align:right"
      : centeredAligned.has(cell as LayoutCell)
      ? "text-align:center"
      : "";
    return html`<span style=${style}>${labels[cell] ?? cell}</span>`;
  }

  protected renderDepartureRow(row: DeparturesDataRow, index: number): TemplateResult {
    const arrivalOffset = this.config.arrival_time_offset ?? DEFAULT_ARRIVAL_OFFSET;
    const isArriving = row.time.isArriving(arrivalOffset);
    const hasAnimation = !!this.config.departure_animation;

    const canceledStyle = this.config.canceled_style ?? CanceledStyle.DIM_STRIKETHROUGH;
    if (row.canceled && canceledStyle === CanceledStyle.HIDE) return html``;

    const canceledClass = row.canceled ? `canceled-${canceledStyle}` : "";
    const alertOpen = this._activeAlertRow === index;

    return html`
      <div
        class=${classMap({ "departure-row": true, [canceledClass]: !!canceledClass })}
        style=${styleMap({ gridTemplateColumns: this.gridTemplate })}
        data-index=${index}
        data-arriving=${isArriving && hasAnimation ? "true" : "false"}
      >
        ${this.layout.map((cell) => this.renderCell(cell as LayoutCell, row, index))}
      </div>
      ${alertOpen && row.notices.length > 0 ? html`
        <div class="alert-panel">
          <ha-icon icon="mdi:alert-circle" class="alert-panel-icon"></ha-icon>
          <div class="alert-panel-text">
            ${row.notices.map((n) => html`<div>${n}</div>`)}
          </div>
          <button class="alert-panel-close" @click=${() => { this._activeAlertRow = null; }}>✕</button>
        </div>
      ` : nothing}
    `;
  }

  protected renderCell(cell: LayoutCell, row: DeparturesDataRow, index = 0): TemplateResult {
    switch (cell) {
      case LayoutCell.ICON:        return this.renderIconCell(row);
      case LayoutCell.LINE:        return this.renderLineCell(row);
      case LayoutCell.DESTINATION: return this.renderDestinationCell(row, index);
      case LayoutCell.TIME_DIFF:   return this.renderTimeDiffCell(row);
      case LayoutCell.PLANNED_TIME:   return this.renderPlannedTimeCell(row);
      case LayoutCell.ESTIMATED_TIME: return this.renderEstimatedTimeCell(row);
      case LayoutCell.DELAY:       return this.renderDelayCell(row);
      case LayoutCell.PLATFORM:    return this.renderPlatformCell(row);
      default:                     return html`<span></span>`;
    }
  }

  private renderIconCell(row: DeparturesDataRow): TemplateResult {
    return html`<span class="cell-icon"><ha-icon .icon=${row.icon ?? "mdi:bus"}></ha-icon></span>`;
  }

  private renderLineCell(row: DeparturesDataRow): TemplateResult {
    const color = row.lineColor ?? "#888";
    const textColor = getContrastTextColor(color);
    return html`
      <span class="cell-line" style=${styleMap({ "--line-color": color, "--line-text-color": textColor })}>
        <span class="line-badge">${row.lineName ?? "?"}</span>
      </span>
    `;
  }

  private renderDestinationCell(row: DeparturesDataRow, index: number): TemplateResult {
    const showRtBadge = this.config.show_realtime_badge === true && row.time.realTime;
    const showDeviationBadge = this.config.show_deviation_badge === true && row.notices.length > 0;
    const alertOpen = this._activeAlertRow === index;
    return html`
      <span class="cell-destination">
        ${row.destination}
        ${showRtBadge ? html`<span class="rt-badge">RT</span>` : nothing}
        ${showDeviationBadge ? html`
          <ha-icon
            class=${classMap({ "deviation-badge": true, active: alertOpen })}
            icon="mdi:alert-circle"
            title=${row.notices.join(" | ")}
            @click=${(ev: Event) => {
              ev.stopPropagation();
              this._activeAlertRow = alertOpen ? null : index;
            }}
          ></ha-icon>
        ` : nothing}
      </span>
    `;
  }

  private renderTimeDiffCell(row: DeparturesDataRow): TemplateResult {
    const nowStr = getLocale(this.hass?.language ?? "en").time.now;
    return html`<span class="cell-time-diff">${row.time.timeDiffStr(nowStr)}</span>`;
  }

  private renderPlannedTimeCell(row: DeparturesDataRow): TemplateResult {
    return html`<span class="cell-planned-time">${row.time.plannedTimeStr()}</span>`;
  }

  private renderEstimatedTimeCell(row: DeparturesDataRow): TemplateResult {
    return html`<span class="cell-estimated-time">${row.time.estimatedTimeStr()}</span>`;
  }

  private renderDelayCell(row: DeparturesDataRow): TemplateResult {
    const dm = row.time.delayMinutes;
    const cls = dm === 0 ? "none" : dm > 0 ? "bad" : "ok";
    const label = dm === 0 ? "" : dm > 0 ? `+${dm}m` : `${dm}m`;
    return html`<span class="cell-delay ${cls}">${label}</span>`;
  }

  private renderPlatformCell(row: DeparturesDataRow): TemplateResult {
    return html`<span class="cell-platform" style="text-align:center;display:block">${row.platform}</span>`;
  }

  abstract renderContent(): TemplateResult;
}
