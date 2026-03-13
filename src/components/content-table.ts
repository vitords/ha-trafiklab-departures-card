import { html, css, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { ContentBase } from "./content";
import { BASE_STYLES } from "../styles";
import { DEFAULT_DEPARTURES_TO_SHOW } from "../constants";

@customElement("trafiklab-content-table")
export class ContentTable extends ContentBase {
  static styles = [BASE_STYLES, css`
    .departures-container {
      width: 100%;
      overflow-x: auto;
    }
    .departure-row {
      min-width: 400px;
    }
  `];

  renderContent(): TemplateResult {
    const limit = this.config.departures_to_show ?? DEFAULT_DEPARTURES_TO_SHOW;
    const rows = this.config.sort_departures
      ? [...this.rows].sort((a, b) => a.time.timeDiff() - b.time.timeDiff())
      : this.rows;
    const visible = rows.slice(0, limit);

    return html`
      <div class="departures-container">
        ${this.renderListHeader()}
        ${visible.map((row, i) => this.renderDepartureRow(row, i))}
      </div>
    `;
  }

  protected render(): TemplateResult {
    return this.renderContent();
  }
}
