import { html, css, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { ContentBase } from "./content";
import { BASE_STYLES } from "../styles";
import { DEFAULT_DEPARTURES_TO_SHOW } from "../constants";

@customElement("trafiklab-content-list")
export class ContentList extends ContentBase {
  static styles = [BASE_STYLES, css`
    .departures-container {
      overflow-y: auto;
      max-height: 400px;
    }
  `];

  renderContent(): TemplateResult {
    const limit = this.config.departures_to_show ?? DEFAULT_DEPARTURES_TO_SHOW;
    const visible = this.rows.slice(0, limit);

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
