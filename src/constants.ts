import { CardOrientation, CardTheme, LayoutCell } from "./types";

export const CARD_NAME = "trafiklab-departures-card";
export const CARD_EDITOR_NAME = "trafiklab-departures-card-editor";
export const CARD_VERSION = "1.0.0";

export const DEFAULT_TITLE = "Departures";
export const DEFAULT_ICON = "mdi:bus-clock";
export const DEFAULT_LINE_COLOR = "#888888";
export const DEFAULT_ORIENTATION = CardOrientation.VERTICAL;
export const DEFAULT_THEME = CardTheme.BASIC;
export const DEFAULT_DEPARTURES_TO_SHOW = 5;
export const DEFAULT_ARRIVAL_OFFSET = 2;
export const DEFAULT_SCROLL_BACK_TIMEOUT = 5;
export const DEFAULT_UPDATE_INTERVAL = 10_000; // ms

export const DEFAULT_LAYOUT: LayoutCell[] = [
  LayoutCell.ICON,
  LayoutCell.LINE,
  LayoutCell.DESTINATION,
  LayoutCell.TIME_DIFF,
  LayoutCell.PLANNED_TIME,
  LayoutCell.DELAY,
];
