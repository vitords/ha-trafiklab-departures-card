import { HassEntity } from "home-assistant-js-websocket";
import { DepartureTime } from "./departure-time";
import {
  Config,
  DeparturesDataRow,
  LineConfig,
  LineFilter,
  TrafiklabDeparture,
  TrafiklabSensorAttributes,
  TransportMode,
} from "../types";
import { DEFAULT_LINE_COLOR } from "../constants";
import { transportModeIcon } from "../helpers";

/**
 * Parses a Trafiklab sensor entity and returns DeparturesDataRow[] by applying
 * the card's line-group filters and color mappings.
 */
export function parseTrafiklabEntity(
  entity: HassEntity,
  config: Config,
): DeparturesDataRow[] {
  const attrs = entity.attributes as Partial<TrafiklabSensorAttributes>;
  const upcoming: TrafiklabDeparture[] = attrs.upcoming ?? [];

  if (!upcoming.length) return [];

  const lineConfigs: LineConfig[] = config.lines?.length ? config.lines : [{}];
  const excludeFilters = config.exclude ?? [];

  const rows: DeparturesDataRow[] = [];

  for (const dep of upcoming) {
    if (excludeFilters.some((f) => matchesFilter(dep, f))) continue;
    const matchedLine = findMatchingLine(dep, lineConfigs);
    if (!matchedLine) continue;

    const departureTime = new DepartureTime({
      delayMinutes: dep.delay_minutes ?? 0,
      canceled: dep.canceled ?? false,
      realTime: dep.real_time ?? false,
      minutesUntil: dep.minutes_until ?? null,
      timeFormatted: dep.time_formatted ?? null,
    });

    rows.push({
      time: departureTime,
      lineColor: matchedLine.line_color ?? DEFAULT_LINE_COLOR,
      lineName: matchedLine.line_name ?? dep.line,
      icon: matchedLine.icon ?? transportModeIcon(dep.transport_mode),
      destination: dep.destination,
      platform: dep.platform ?? "",
      canceled: dep.canceled ?? false,
      hasNotices: dep.has_notices ?? false,
      transportMode: dep.transport_mode as TransportMode,
    });
  }

  return rows;
}

function findMatchingLine(
  dep: TrafiklabDeparture,
  lineConfigs: LineConfig[],
): LineConfig | null {
  for (const lc of lineConfigs) {
    if (!lc.filter) return lc;
    if (matchesFilter(dep, lc.filter)) return lc;
  }
  return null;
}

function matchesFilter(dep: TrafiklabDeparture, filter: LineFilter): boolean {
  if (filter.transport_mode !== undefined) {
    const allowed = Array.isArray(filter.transport_mode)
      ? filter.transport_mode.map((m) => m.toUpperCase())
      : [filter.transport_mode.toUpperCase()];
    if (!allowed.includes(dep.transport_mode?.toUpperCase())) return false;
  }

  if (filter.line !== undefined) {
    const allowed = Array.isArray(filter.line)
      ? filter.line.map(String)
      : [String(filter.line)];
    if (!allowed.includes(String(dep.line))) return false;
  }

  if (filter.destination !== undefined) {
    const dest = dep.destination?.toLowerCase() ?? "";
    const needles = Array.isArray(filter.destination)
      ? filter.destination
      : [filter.destination];
    if (!needles.some((n) => dest.includes(n.toLowerCase()))) return false;
  }

  if (filter.platform !== undefined) {
    const allowed = Array.isArray(filter.platform)
      ? filter.platform.map(String)
      : [String(filter.platform)];
    if (!allowed.includes(String(dep.platform ?? ""))) return false;
  }

  return true;
}
