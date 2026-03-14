import { LitElement, html, nothing, TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";
import { HomeAssistant } from "custom-card-helpers";

import { Config, DeparturesDataRow, LayoutCell } from "../types";
import { DEFAULT_LAYOUT, DEFAULT_ARRIVAL_OFFSET } from "../constants";
import { getContrastTextColor } from "../helpers";
import { ANIMATION_PRESETS } from "../animate-presets";
import { buildGridTemplate } from "../data/layout";

export abstract class ContentBase extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: Config;
  @property({ attribute: false }) rows: DeparturesDataRow[] = [];

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

    this.shadowRoot?.querySelectorAll<HTMLElement>(".departure-row").forEach((el) => {
      const shouldAnimate = el.dataset.arriving === "true" && !!preset;

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
    const labels: Record<string, string> = {
      [LayoutCell.ICON]: "",
      [LayoutCell.LINE]: "Line",
      [LayoutCell.DESTINATION]: "Destination",
      [LayoutCell.TIME_DIFF]: "In",
      [LayoutCell.PLANNED_TIME]: "Sched.",
      [LayoutCell.ESTIMATED_TIME]: "Est.",
      [LayoutCell.DELAY]: "Delay",
      [LayoutCell.PLATFORM]: "Platform",
    };
    const rightAligned = new Set([
      LayoutCell.TIME_DIFF,
      LayoutCell.PLANNED_TIME,
      LayoutCell.ESTIMATED_TIME,
      LayoutCell.DELAY,
    ]);
    const style = rightAligned.has(cell as LayoutCell) ? "text-align:right" : "";
    return html`<span style=${style}>${labels[cell] ?? cell}</span>`;
  }

  protected renderDepartureRow(row: DeparturesDataRow, index: number): TemplateResult {
    const arrivalOffset = this.config.arrival_time_offset ?? DEFAULT_ARRIVAL_OFFSET;
    const isArriving = row.time.isArriving(arrivalOffset);
    const hasAnimation = !!this.config.departure_animation;

    return html`
      <div
        class=${classMap({ "departure-row": true, canceled: row.canceled })}
        style=${styleMap({ gridTemplateColumns: this.gridTemplate })}
        data-index=${index}
        data-arriving=${isArriving && hasAnimation ? "true" : "false"}
      >
        ${this.layout.map((cell) => this.renderCell(cell as LayoutCell, row))}
      </div>
    `;
  }

  protected renderCell(cell: LayoutCell, row: DeparturesDataRow): TemplateResult {
    switch (cell) {
      case LayoutCell.ICON:        return this.renderIconCell(row);
      case LayoutCell.LINE:        return this.renderLineCell(row);
      case LayoutCell.DESTINATION: return this.renderDestinationCell(row);
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

  private renderDestinationCell(row: DeparturesDataRow): TemplateResult {
    const showRtBadge = this.config.show_realtime_badge === true && row.time.realTime;
    return html`
      <span class="cell-destination">
        ${row.destination}
        ${showRtBadge ? html`<span class="rt-badge">RT</span>` : nothing}
      </span>
    `;
  }

  private renderTimeDiffCell(row: DeparturesDataRow): TemplateResult {
    return html`<span class="cell-time-diff">${row.time.timeDiffStr()}</span>`;
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
    return html`<span class="cell-platform">${row.platform}</span>`;
  }

  abstract renderContent(): TemplateResult;
}
