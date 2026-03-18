import { ActionConfig, LovelaceCardConfig } from "custom-card-helpers";
import { DepartureTime } from "./data/departure-time";

// ─── Trafiklab sensor data types ────────────────────────────────────────────

export type TransportMode = "BUS" | "TRAIN" | "METRO" | "TRAM" | "BOAT" | "TAXI";

export interface TrafiklabDeparture {
  index: number;
  line: string;
  destination: string;
  direction: string;
  scheduled_time: string;
  expected_time: string;
  time_formatted: string;
  minutes_until: number | null;
  transport_mode: TransportMode;
  real_time: boolean;
  delay: number;
  delay_minutes: number;
  canceled: boolean;
  platform: string;
  route_name: string;
  agency: string;
  trip_id: string;
  notices: string[];
}

export interface TrafiklabSensorAttributes {
  line: string;
  destination: string;
  direction: string;
  scheduled_time: string;
  expected_time: string;
  transport_mode: TransportMode;
  real_time: boolean;
  delay: number;
  canceled: boolean;
  platform: string;
  upcoming: TrafiklabDeparture[];
  attribution: string;
  last_update: string;
  integration: string;
}

// ─── Card configuration types ───────────────────────────────────────────────

/** Filter criteria for matching departures from the sensor */
export interface LineFilter {
  transport_mode?: TransportMode | TransportMode[];
  line?: string | string[];
  destination?: string | string[]; // one or more case-insensitive substrings (OR logic)
  platform?: string | string[];    // exact match (or list)
  direction?: string;
}

/** A "line group" — a filter + display settings for a set of departures */
export interface LineConfig {
  filter?: LineFilter;
  line_color?: string;
  line_name?: string; // override displayed name
  icon?: string; // override transport icon
}

/** Top-level card configuration */
export interface Config extends LovelaceCardConfig {
  entity: string;
  title?: string;
  icon?: string;
  show_header?: boolean;
  show_list_header?: boolean;
  orientation?: CardOrientation;
  theme?: CardTheme;
  layout?: Array<LayoutCell | string>;
  departures_to_show?: number;
  sort_departures?: boolean;
  show_scroll_buttons?: boolean;
  scroll_back_timeout?: number;
  departure_animation?: string;
  departure_animation_duration?: number;
  arrival_time_offset?: number;
  animate_line?: boolean;
  show_realtime_badge?: boolean;
  animate_target?: AnimateTarget;
  canceled_style?: CanceledStyle;
  show_deviation_badge?: boolean;
  exclude?: LineFilter[];
  lines?: LineConfig[];

  // tap actions
  hold_action?: ActionConfig;
  tap_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

// ─── Internal rendering types ────────────────────────────────────────────────

export type DeparturesDataRow = {
  time: DepartureTime;
  lineColor: string | null;
  lineName: string | null;
  icon: string | null;
  destination: string;
  platform: string;
  canceled: boolean;
  notices: string[];
  transportMode: TransportMode;
};

// ─── Enums ───────────────────────────────────────────────────────────────────

export enum CardTheme {
  BASIC = "basic",
  BLACK_WHITE = "black-white",
  BLUE_OCEAN = "blue-ocean",
  CAPPUCINO = "cappucino",
  TABLE = "table",
}

export enum CardOrientation {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}

export enum CanceledStyle {
  DIM_STRIKETHROUGH = "dim-strikethrough",
  STRIKETHROUGH     = "strikethrough",
  DIM               = "dim",
  HIDE              = "hide",
  LABEL             = "label",
}

export enum AnimateTarget {
  ROW      = "row",
  ICON     = "icon",
  TIME     = "time",
  ICON_TIME = "icon-time",
}

export enum LayoutCell {
  DELAY = "delay",
  DESTINATION = "destination",
  ESTIMATED_TIME = "estimated-time",
  ICON = "icon",
  LINE = "line",
  PLANNED_TIME = "planned-time",
  TIME_DIFF = "time-diff",
  PLATFORM = "platform",
}
