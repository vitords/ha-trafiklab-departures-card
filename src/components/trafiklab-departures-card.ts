import { LitElement, html, css, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";
import { HassEntity } from "home-assistant-js-websocket";

import { Config, CardOrientation, DeparturesDataRow } from "../types";
import {
  CARD_NAME,
  CARD_EDITOR_NAME,
  CARD_VERSION,
  DEFAULT_TITLE,
  DEFAULT_ICON,
  DEFAULT_ORIENTATION,
  DEFAULT_STALE_AFTER_MINUTES,
  DEFAULT_UPDATE_INTERVAL,
} from "../constants";
import { parseTrafiklabEntity } from "../data/trafiklab-parser";
import { BASE_STYLES, THEME_STYLES } from "../styles";
import { ConfigError } from "../exceptions";
import { getLocale } from "../locales";

import "./content-list";
import "./content-table";
import "../editor/departures-card-editor";

// Register card in the custom card picker
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: CARD_NAME,
  name: "Trafiklab Departures Card",
  description: "Public transport departures from the Trafiklab integration",
  preview: true,
  documentationURL: "https://github.com/vitords/ha-trafiklab-departures-card",
});

console.info(
  `%c TRAFIKLAB-DEPARTURES-CARD %c v${CARD_VERSION} `,
  "color: white; background: #1565c0; font-weight: bold;",
  "color: #1565c0; background: white; font-weight: bold;",
);

@customElement(CARD_NAME)
export class TrafiklabDeparturesCard extends LitElement {
  static styles = [
    BASE_STYLES,
    css`
      :host {
        display: block;
      }
      ha-card {
        --card-background-color: var(--ha-card-background, var(--card-background-color, white));
      }
    `,
  ];

  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: Config;
  @state() private _rows: DeparturesDataRow[] = [];

  private _updateTimer?: ReturnType<typeof setInterval>;

  static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement(CARD_EDITOR_NAME) as LovelaceCardEditor;
  }

  static getStubConfig(): Config {
    return {
      type: `custom:${CARD_NAME}`,
      entity: "",
      title: DEFAULT_TITLE,
      lines: [{ line_color: "#1565c0" }],
    };
  }

  setConfig(config: Config): void {
    if (!config.entity) {
      throw new ConfigError("A Trafiklab sensor entity must be specified.");
    }
    this._config = config;
  }

  connectedCallback(): void {
    super.connectedCallback();
    // HA detaches the panel while hidden; hass may be unchanged on reattach
    this._refresh();
    this._updateTimer = setInterval(() => this._refresh(), DEFAULT_UPDATE_INTERVAL);
    document.addEventListener("visibilitychange", this._onVisibilityChange);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("visibilitychange", this._onVisibilityChange);
    if (this._updateTimer) {
      clearInterval(this._updateTimer);
      this._updateTimer = undefined;
    }
  }

  /** hass changes on every state change in HA; only this card's sensor matters */
  protected shouldUpdate(changed: Map<string, unknown>): boolean {
    if (changed.size !== 1 || !changed.has("hass") || !this._config) return true;
    const previous = changed.get("hass") as HomeAssistant | undefined;
    return (
      !previous ||
      previous.language !== this.hass.language ||
      previous.states[this._config.entity] !== this.hass.states[this._config.entity]
    );
  }

  protected willUpdate(changed: Map<string, unknown>): void {
    if (changed.has("hass") || changed.has("_config")) {
      this._refresh();
    }
  }

  /** Timers are paused while the screen is off; don't wait for the next tick on wake */
  private _onVisibilityChange = (): void => {
    if (!document.hidden) this._refresh();
  };

  private _refresh(): void {
    if (!this.hass || !this._config?.entity) return;
    const entity = this.hass.states[this._config.entity];
    if (!entity) return;
    this._rows = parseTrafiklabEntity(entity, this._config);
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) return html``;

    const loc = getLocale(this.hass.language);
    const entity = this.hass.states[this._config.entity];
    if (!entity) {
      return html`
        <ha-card>
          ${this._renderHeader()}
          <div class="state-message error">
            ${loc.state.not_found(this._config.entity)}
          </div>
        </ha-card>
      `;
    }

    const state = entity.state;
    // The sensor is also "unknown" after a successful fetch with no departures
    const isUnavailable =
      state === "unavailable" || (state === "unknown" && !entity.attributes.last_update);

    const orientation = this._config.orientation ?? DEFAULT_ORIENTATION;
    const theme = this._config.theme;
    const themeStyle = theme ? THEME_STYLES[theme] : undefined;

    return html`
      <ha-card>
        ${themeStyle ? html`<style>${themeStyle}</style>` : nothing}
        ${this._renderHeader()}
        ${isUnavailable
          ? html`<div class="state-message unavailable">${loc.state.unavailable}</div>`
          : !this._rows.length
          ? html`<div class="state-message">${loc.state.no_departures}</div>`
          : orientation === CardOrientation.HORIZONTAL
          ? html`
              <trafiklab-content-table
                .hass=${this.hass}
                .config=${this._config}
                .rows=${this._rows}
              ></trafiklab-content-table>
            `
          : html`
              <trafiklab-content-list
                .hass=${this.hass}
                .config=${this._config}
                .rows=${this._rows}
              ></trafiklab-content-list>
            `}
        ${this._renderFooter(entity)}
      </ha-card>
    `;
  }

  private _renderHeader(): TemplateResult {
    if (this._config.show_header === false) return html`${nothing}`;
    const title = this._config.title ?? DEFAULT_TITLE;
    const icon = this._config.icon ?? DEFAULT_ICON;
    return html`
      <div class="card-header">
        <ha-icon .icon=${icon}></ha-icon>
        <span>${title}</span>
      </div>
    `;
  }

  private _renderFooter(entity: HassEntity): TemplateResult {
    const lastUpdate = entity?.attributes?.last_update;
    if (!lastUpdate) return html`${nothing}`;
    const time = new Date(lastUpdate).toLocaleTimeString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const loc = getLocale(this.hass.language);
    if (this._isStale(lastUpdate)) {
      return html`<div class="card-footer stale">${loc.state.stale(time)}</div>`;
    }
    return html`
      <div class="card-footer">${loc.state.updated(time)}</div>
    `;
  }

  private _isStale(lastUpdate: string): boolean {
    const limit = this._config.stale_after_minutes ?? DEFAULT_STALE_AFTER_MINUTES;
    return limit > 0 && Date.now() - Date.parse(lastUpdate) > limit * 60_000;
  }

  getCardSize(): number {
    const n = this._config?.departures_to_show ?? 5;
    return Math.ceil(n / 2) + 1;
  }
}
