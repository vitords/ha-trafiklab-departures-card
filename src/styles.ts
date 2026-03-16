import { css } from "lit";
import { CardTheme } from "./types";

export const BASE_STYLES = css`
  :host {
    --delay-ok: #23a043;
    --delay-bad: #f44336;
    --delay-none: #888888;
    --rt-color: #2196f3;
    --card-border-color: rgba(0, 0, 0, 0.12);
  }

  ha-card {
    overflow: hidden;
    padding: 0;
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px 4px 16px;
    font-size: 1.1em;
    font-weight: 500;
  }

  .card-header ha-icon {
    --mdc-icon-size: 22px;
  }

  .departures-container {
    padding: 4px 0 8px 0;
  }

  .list-header,
  .departure-row {
    display: grid;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    min-height: 36px;
  }

  .list-header {
    font-size: 0.75em;
    font-weight: 600;
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .departure-row {
    border-bottom: 1px solid var(--card-border-color);
    cursor: pointer;
  }

  .departure-row:last-child {
    border-bottom: none;
  }

  /* canceled styles — applied via data-canceled-style attribute on the row */
  .departure-row.canceled-dim-strikethrough {
    opacity: 0.4;
    text-decoration: line-through;
  }
  .departure-row.canceled-strikethrough {
    text-decoration: line-through;
  }
  .departure-row.canceled-dim {
    opacity: 0.4;
  }
  .departure-row.canceled-label .cell-destination::after {
    content: "CANCELLED";
    margin-left: 6px;
    font-size: 0.7em;
    font-weight: 700;
    color: var(--error-color, #c0392b);
    vertical-align: middle;
    letter-spacing: 0.04em;
  }

  /* deviation badge */
  .deviation-badge {
    --mdc-icon-size: 14px;
    color: var(--warning-color, #f39c12);
    margin-left: 4px;
    vertical-align: middle;
    cursor: pointer;
    flex-shrink: 0;
    transition: transform 0.15s ease;
  }
  .deviation-badge.active {
    transform: scale(1.25);
    color: var(--error-color, #e67e22);
  }

  /* alert panel — shown below a departure row when the badge is tapped */
  .alert-panel {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 8px 12px;
    margin: -1px 0 4px 0;
    background: color-mix(in srgb, var(--warning-color, #f39c12) 12%, transparent);
    border-left: 3px solid var(--warning-color, #f39c12);
    border-radius: 0 4px 4px 0;
    font-size: 0.82em;
    line-height: 1.4;
    animation: alertSlideIn 0.15s ease;
  }
  @keyframes alertSlideIn {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .alert-panel-icon {
    --mdc-icon-size: 16px;
    color: var(--warning-color, #f39c12);
    flex-shrink: 0;
    margin-top: 1px;
  }
  .alert-panel-text {
    flex: 1;
    color: var(--primary-text-color);
  }
  .alert-panel-text div + div {
    margin-top: 4px;
    padding-top: 4px;
    border-top: 1px solid color-mix(in srgb, var(--warning-color, #f39c12) 25%, transparent);
  }
  .alert-panel-close {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--secondary-text-color);
    font-size: 0.9em;
    padding: 0;
    line-height: 1;
    flex-shrink: 0;
    opacity: 0.6;
  }
  .alert-panel-close:hover {
    opacity: 1;
  }

  /* Transport icon */
  .cell-icon ha-icon {
    --mdc-icon-size: 20px;
    display: flex;
  }

  /* Line badge */
  .cell-line .line-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 700;
    font-size: 0.82em;
    min-width: 28px;
    background: var(--line-color, #888);
    color: var(--line-text-color, #fff);
    white-space: nowrap;
  }

  /* Destination */
  .cell-destination {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.9em;
  }

  /* Time diff */
  .cell-time-diff {
    font-weight: 600;
    font-size: 0.9em;
    text-align: right;
  }

  /* Planned / estimated time */
  .cell-planned-time,
  .cell-estimated-time {
    font-size: 0.82em;
    opacity: 0.75;
    text-align: right;
  }

  /* Delay */
  .cell-delay {
    font-size: 0.8em;
    font-weight: 600;
    text-align: right;
  }
  .cell-delay.ok { color: var(--delay-ok); }
  .cell-delay.bad { color: var(--delay-bad); }
  .cell-delay.none { color: var(--delay-none); }

  /* Platform */
  .cell-platform {
    font-size: 0.78em;
    opacity: 0.7;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Real-time badge */
  .rt-badge {
    display: inline-block;
    font-size: 0.65em;
    font-weight: 700;
    color: var(--rt-color);
    border: 1px solid var(--rt-color);
    border-radius: 3px;
    padding: 0 3px;
    margin-left: 4px;
    vertical-align: middle;
    line-height: 1.4;
  }

  /* State messages */
  .state-message {
    padding: 12px 16px;
    font-size: 0.9em;
    opacity: 0.7;
  }
  .state-message.error {
    color: var(--error-color, red);
    opacity: 1;
  }

  /* Footer */
  .card-footer {
    font-size: 0.72em;
    opacity: 0.5;
    text-align: right;
    padding: 2px 12px 6px 12px;
  }
`;

export const THEME_STYLES: Record<CardTheme, ReturnType<typeof css>> = {
  [CardTheme.BASIC]: css``,

  [CardTheme.BLACK_WHITE]: css`
    ha-card {
      background: #000;
      color: #fff;
    }
    .departure-row {
      border-color: #333;
    }
    .cell-destination {
      text-transform: uppercase;
      font-family: "Roboto Mono", monospace;
    }
  `,

  [CardTheme.BLUE_OCEAN]: css`
    ha-card {
      background: #0d2f55;
      color: #fff;
    }
    .departure-row {
      border-color: rgba(255,255,255,0.1);
    }
    .list-header {
      color: rgba(255,255,255,0.5);
    }
  `,

  [CardTheme.CAPPUCINO]: css`
    ha-card {
      background: #f5efe6;
      color: #6f4e37;
    }
    .departure-row {
      border-left: 4px solid var(--line-color, #8B5E3C);
      border-bottom-color: rgba(111,78,55,0.15);
      padding-left: 8px;
    }
    .card-header {
      font-weight: 700;
    }
  `,

  [CardTheme.TABLE]: css`
    .departure-row {
      border: 1px solid var(--card-border-color);
      border-radius: 4px;
      margin: 2px 8px;
    }
  `,
};
