import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";

import {
  CardOrientation,
  CardTheme,
  Config,
  LayoutCell,
  LineConfig,
  TransportMode,
} from "../types";
import { CARD_EDITOR_NAME, DEFAULT_DEPARTURES_TO_SHOW, DEFAULT_LAYOUT } from "../constants";

/** Canonical column order and display labels */
const ALL_COLUMNS: { cell: LayoutCell; label: string }[] = [
  { cell: LayoutCell.ICON,           label: "Icon" },
  { cell: LayoutCell.LINE,           label: "Line" },
  { cell: LayoutCell.DESTINATION,    label: "Destination" },
  { cell: LayoutCell.PLATFORM,       label: "Platform" },
  { cell: LayoutCell.TIME_DIFF,      label: "In (countdown)" },
  { cell: LayoutCell.PLANNED_TIME,   label: "Scheduled time" },
  { cell: LayoutCell.ESTIMATED_TIME, label: "Estimated time" },
  { cell: LayoutCell.DELAY,          label: "Delay" },
];

@customElement(CARD_EDITOR_NAME)
export class DeparturesCardEditor extends LitElement implements LovelaceCardEditor {
  static styles = css`
    :host {
      display: block;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      padding: 8px 0;
    }
    .full-width {
      grid-column: 1 / -1;
    }
    .section-title {
      font-weight: 600;
      font-size: 0.9em;
      margin: 12px 0 4px 0;
      padding-bottom: 4px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }
    .line-card {
      border: 1px solid var(--divider-color, #ddd);
      border-radius: 6px;
      padding: 8px;
      margin-bottom: 8px;
    }
    .line-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      font-weight: 600;
      font-size: 0.85em;
    }
    .remove-btn {
      cursor: pointer;
      color: var(--error-color, red);
      background: none;
      border: none;
      font-size: 1.2em;
      padding: 0 4px;
    }
    .add-btn {
      margin-top: 8px;
      width: 100%;
    }
    .hint {
      font-size: 0.75em;
      opacity: 0.6;
      grid-column: 1 / -1;
      margin-top: -4px;
    }
    ha-textfield, ha-select {
      width: 100%;
    }
    .columns-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2px 8px;
      padding: 4px 0;
    }
  `;

  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: Config;

  setConfig(config: Config): void {
    this._config = config;
  }

  private _updateConfig(updates: Partial<Config>): void {
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: { ...this._config, ...updates } },
    }));
  }

  private _updateLine(index: number, updates: Partial<LineConfig>): void {
    const lines = [...(this._config.lines ?? [{}])];
    lines[index] = { ...lines[index], ...updates };
    this._updateConfig({ lines });
  }

  private _updateLineFilter(index: number, key: string, value: unknown): void {
    const lines = [...(this._config.lines ?? [{}])];
    const filter = { ...(lines[index]?.filter ?? {}), [key]: value || undefined };
    lines[index] = { ...lines[index], filter };
    this._updateConfig({ lines });
  }

  /** Parse a comma-separated string into a single string or array (or undefined if empty) */
  private _parseCSV(raw: string): string | string[] | undefined {
    const parts = raw.split(",").map((s) => s.trim()).filter(Boolean);
    if (parts.length === 0) return undefined;
    return parts.length === 1 ? parts[0] : parts;
  }

  /** Serialize a string | string[] filter value back to a comma-separated display string */
  private _serializeCSV(value: string | string[] | undefined): string {
    if (!value) return "";
    return Array.isArray(value) ? value.join(", ") : value;
  }

  private _toggleColumn(cell: LayoutCell, enabled: boolean): void {
    const current: LayoutCell[] = (this._config.layout as LayoutCell[]) ?? DEFAULT_LAYOUT;
    let updated: LayoutCell[];
    if (enabled) {
      // Insert in canonical order
      const order = ALL_COLUMNS.map((c) => c.cell);
      updated = order.filter((c) => c === cell || current.includes(c));
    } else {
      updated = current.filter((c) => c !== cell);
    }
    this._updateConfig({ layout: updated });
  }

  private _addLine(): void {
    const lines = [...(this._config.lines ?? [])];
    lines.push({ line_color: "#1565c0" });
    this._updateConfig({ lines });
  }

  private _removeLine(index: number): void {
    const lines = [...(this._config.lines ?? [])];
    lines.splice(index, 1);
    this._updateConfig({ lines });
  }

  protected render(): TemplateResult {
    if (!this._config) return html``;

    const lines: LineConfig[] = this._config.lines ?? [{}];

    return html`
      <!-- General -->
      <div class="section-title">General</div>
      <div class="grid">
        <div class="full-width">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._config.entity ?? ""}
            .includeDomains=${["sensor"]}
            label="Trafiklab Departures Sensor"
            allow-custom-entity
            @value-changed=${(ev: CustomEvent) =>
              this._updateConfig({ entity: ev.detail.value })}
          ></ha-entity-picker>
        </div>
        <ha-textfield
          label="Title"
          .value=${this._config.title ?? "Departures"}
          @change=${(ev: Event) =>
            this._updateConfig({ title: (ev.target as HTMLInputElement).value || undefined })}
        ></ha-textfield>
        <ha-textfield
          label="Icon"
          .value=${this._config.icon ?? "mdi:bus-clock"}
          @change=${(ev: Event) =>
            this._updateConfig({ icon: (ev.target as HTMLInputElement).value || undefined })}
        ></ha-textfield>
        <ha-formfield label="Show header">
          <ha-switch
            .checked=${this._config.show_header !== false}
            @change=${(ev: Event) =>
              this._updateConfig({ show_header: (ev.target as HTMLInputElement).checked })}
          ></ha-switch>
        </ha-formfield>
        <ha-formfield label="Show column headers">
          <ha-switch
            .checked=${this._config.show_list_header === true}
            @change=${(ev: Event) =>
              this._updateConfig({ show_list_header: (ev.target as HTMLInputElement).checked })}
          ></ha-switch>
        </ha-formfield>
        <ha-formfield label="Show real-time badge">
          <ha-switch
            .checked=${this._config.show_realtime_badge === true}
            @change=${(ev: Event) =>
              this._updateConfig({ show_realtime_badge: (ev.target as HTMLInputElement).checked })}
          ></ha-switch>
        </ha-formfield>
      </div>

      <!-- Display -->
      <div class="section-title">Display</div>
      <div class="grid">
        <ha-select
          label="Orientation"
          .value=${this._config.orientation ?? CardOrientation.VERTICAL}
          @change=${(ev: Event) =>
            this._updateConfig({ orientation: (ev.target as any).value as CardOrientation })}
        >
          <mwc-list-item value=${CardOrientation.VERTICAL}>Vertical (list)</mwc-list-item>
          <mwc-list-item value=${CardOrientation.HORIZONTAL}>Horizontal (table)</mwc-list-item>
        </ha-select>
        <ha-select
          label="Theme"
          .value=${this._config.theme ?? CardTheme.BASIC}
          @change=${(ev: Event) =>
            this._updateConfig({ theme: (ev.target as any).value as CardTheme })}
        >
          <mwc-list-item value=${CardTheme.BASIC}>Basic</mwc-list-item>
          <mwc-list-item value=${CardTheme.BLACK_WHITE}>Black & White</mwc-list-item>
          <mwc-list-item value=${CardTheme.BLUE_OCEAN}>Blue Ocean</mwc-list-item>
          <mwc-list-item value=${CardTheme.CAPPUCINO}>Cappuccino</mwc-list-item>
          <mwc-list-item value=${CardTheme.TABLE}>Table</mwc-list-item>
        </ha-select>
        <ha-textfield
          label="Departures to show"
          type="number"
          .value=${String(this._config.departures_to_show ?? DEFAULT_DEPARTURES_TO_SHOW)}
          @change=${(ev: Event) => {
            const val = parseInt((ev.target as HTMLInputElement).value);
            this._updateConfig({ departures_to_show: isNaN(val) ? DEFAULT_DEPARTURES_TO_SHOW : val });
          }}
        ></ha-textfield>
        <ha-formfield label="Sort by time">
          <ha-switch
            .checked=${this._config.sort_departures === true}
            @change=${(ev: Event) =>
              this._updateConfig({ sort_departures: (ev.target as HTMLInputElement).checked })}
          ></ha-switch>
        </ha-formfield>
      </div>

      <!-- Animations -->
      <div class="section-title">Animations</div>
      <div class="grid">
        <ha-select
          label="Animation on arrival"
          .value=${this._config.departure_animation ?? "none"}
          @change=${(ev: Event) => {
            const v = (ev.target as any).value;
            this._updateConfig({ departure_animation: v === "none" ? undefined : v });
          }}
        >
          <mwc-list-item value="none">None</mwc-list-item>
          <mwc-list-item value="flash">Flash</mwc-list-item>
          <mwc-list-item value="bounce">Bounce</mwc-list-item>
          <mwc-list-item value="shakeX">Shake horizontal</mwc-list-item>
          <mwc-list-item value="shakeY">Shake vertical</mwc-list-item>
          <mwc-list-item value="fadeIn">Fade in</mwc-list-item>
          <mwc-list-item value="fadeOut">Fade out</mwc-list-item>
          <mwc-list-item value="zoomIn">Zoom in</mwc-list-item>
        </ha-select>
        <ha-textfield
          label="Trigger (minutes before departure)"
          type="number"
          .value=${String(this._config.arrival_time_offset ?? 2)}
          @change=${(ev: Event) => {
            const val = parseInt((ev.target as HTMLInputElement).value);
            this._updateConfig({ arrival_time_offset: isNaN(val) ? 2 : val });
          }}
        ></ha-textfield>
        <ha-textfield
          label="Duration override (ms, 0 = default)"
          type="number"
          .value=${String(this._config.departure_animation_duration ?? 0)}
          @change=${(ev: Event) => {
            const val = parseInt((ev.target as HTMLInputElement).value);
            this._updateConfig({ departure_animation_duration: !val ? undefined : val });
          }}
        ></ha-textfield>
      </div>

      <!-- Columns -->
      <div class="section-title">Columns</div>
      <div class="columns-grid">
        ${ALL_COLUMNS.map(({ cell, label }) => {
          const active = ((this._config.layout as LayoutCell[]) ?? DEFAULT_LAYOUT).includes(cell);
          return html`
            <ha-formfield .label=${label}>
              <ha-checkbox
                .checked=${active}
                @change=${(ev: Event) =>
                  this._toggleColumn(cell, (ev.target as HTMLInputElement).checked)}
              ></ha-checkbox>
            </ha-formfield>
          `;
        })}
      </div>

      <!-- Line groups -->
      <div class="section-title">Line Groups</div>
      ${lines.map((line, i) => this._renderLineEditor(line, i))}
      <mwc-button class="add-btn" @click=${this._addLine}>
        + Add line group
      </mwc-button>
    `;
  }

  private _renderLineEditor(line: LineConfig, index: number): TemplateResult {
    const filter = line.filter ?? {};
    const transportMode = Array.isArray(filter.transport_mode)
      ? filter.transport_mode[0] ?? ""
      : filter.transport_mode ?? "";

    return html`
      <div class="line-card">
        <div class="line-card-header">
          <span>Group ${index + 1}</span>
          <button class="remove-btn" @click=${() => this._removeLine(index)}>✕</button>
        </div>
        <div class="grid">

          <!-- Appearance -->
          <ha-textfield
            label="Line color (hex)"
            .value=${line.line_color ?? "#1565c0"}
            @change=${(ev: Event) =>
              this._updateLine(index, { line_color: (ev.target as HTMLInputElement).value })}
          ></ha-textfield>
          <ha-textfield
            label="Line name override"
            .value=${line.line_name ?? ""}
            placeholder="(from sensor)"
            @change=${(ev: Event) => {
              const v = (ev.target as HTMLInputElement).value;
              this._updateLine(index, { line_name: v || undefined });
            }}
          ></ha-textfield>

          <!-- Filters -->
          <ha-select
            label="Transport mode"
            .value=${transportMode}
            @change=${(ev: Event) => {
              const v = (ev.target as any).value as TransportMode | "";
              this._updateLineFilter(index, "transport_mode", v || undefined);
            }}
          >
            <mwc-list-item value="">All modes</mwc-list-item>
            <mwc-list-item value="BUS">Bus</mwc-list-item>
            <mwc-list-item value="TRAIN">Train</mwc-list-item>
            <mwc-list-item value="METRO">Metro</mwc-list-item>
            <mwc-list-item value="TRAM">Tram</mwc-list-item>
            <mwc-list-item value="BOAT">Boat</mwc-list-item>
            <mwc-list-item value="TAXI">Taxi</mwc-list-item>
          </ha-select>
          <ha-textfield
            label="Line number(s)"
            .value=${this._serializeCSV(filter.line)}
            placeholder="e.g. 7 or 1, 4, 7"
            @change=${(ev: Event) => {
              const v = (ev.target as HTMLInputElement).value;
              this._updateLineFilter(index, "line", this._parseCSV(v));
            }}
          ></ha-textfield>
          <ha-textfield
            label="Destination(s)"
            .value=${this._serializeCSV(filter.destination)}
            placeholder="e.g. Stockholm or Stockholm, Solna"
            class="full-width"
            @change=${(ev: Event) => {
              const v = (ev.target as HTMLInputElement).value;
              this._updateLineFilter(index, "destination", this._parseCSV(v));
            }}
          ></ha-textfield>
          <span class="hint">Comma-separated substrings, any match included (OR logic)</span>
          <ha-textfield
            label="Platform(s)"
            .value=${this._serializeCSV(filter.platform)}
            placeholder="e.g. 3 or 1, 2"
            @change=${(ev: Event) => {
              const v = (ev.target as HTMLInputElement).value;
              this._updateLineFilter(index, "platform", this._parseCSV(v));
            }}
          ></ha-textfield>
          <ha-textfield
            label="Direction"
            .value=${filter.direction ?? ""}
            placeholder="e.g. 0 or 1"
            @change=${(ev: Event) => {
              const v = (ev.target as HTMLInputElement).value.trim();
              this._updateLineFilter(index, "direction", v || undefined);
            }}
          ></ha-textfield>

        </div>
      </div>
    `;
  }
}
