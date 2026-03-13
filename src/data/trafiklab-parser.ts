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

  const rows: DeparturesDataRow[] = [];

  for (const dep of upcoming) {
    const matchedLine = findMatchingLine(dep, lineConfigs);
    if (!matchedLine) continue; // filtered out

    const planned = parseISO(dep.scheduled_time);
    const estimated = dep.expected_time ? parseISO(dep.expected_time) : planned;

    const departureTime = new DepartureTime({
      planned,
      estimated,
      delaySeconds: dep.delay ?? 0,
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
      transportMode: dep.transport_mode as TransportMode,
    });
  }

  return rows;
}

/** Find the first LineConfig whose filter matches this departure, or null if no match */
function findMatchingLine(
  dep: TrafiklabDeparture,
  lineConfigs: LineConfig[],
): LineConfig | null {
  for (const lc of lineConfigs) {
    if (!lc.filter) return lc; // no filter = match everything
    if (matchesFilter(dep, lc.filter)) return lc;
  }
  return null;
}

function matchesFilter(dep: TrafiklabDeparture, filter: LineFilter): boolean {
  // transport_mode filter
  if (filter.transport_mode !== undefined) {
    const allowed = Array.isArray(filter.transport_mode)
      ? filter.transport_mode.map((m) => m.toUpperCase())
      : [filter.transport_mode.toUpperCase()];
    if (!allowed.includes(dep.transport_mode?.toUpperCase())) return false;
  }

  // line number filter
  if (filter.line !== undefined) {
    const allowed = Array.isArray(filter.line)
      ? filter.line.map(String)
      : [String(filter.line)];
    if (!allowed.includes(String(dep.line))) return false;
  }

  // destination substring filter (case-insensitive)
  if (filter.destination !== undefined) {
    const dest = dep.destination?.toLowerCase() ?? "";
    if (!dest.includes(filter.destination.toLowerCase())) return false;
  }

  // direction filter
  if (filter.direction !== undefined) {
    if (String(dep.direction) !== String(filter.direction)) return false;
  }

  return true;
}

function parseISO(isoStr: string): Date {
  if (!isoStr) return new Date(NaN);
  // Handle both "2025-08-08T14:30:00" and "2025-08-08T14:30:00+02:00"
  return new Date(isoStr);
}
