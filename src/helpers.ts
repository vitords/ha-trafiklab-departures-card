import { TransportMode } from "./types";

/** Returns a contrasting text color (black or white) for a given hex background */
export function getContrastTextColor(hexColor: string): string {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // Luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

/** Returns the MDI icon string for a transport mode */
export function transportModeIcon(mode: TransportMode | string): string {
  switch (mode?.toUpperCase()) {
    case "TRAIN":
      return "mdi:train";
    case "METRO":
      return "mdi:subway-variant";
    case "TRAM":
      return "mdi:tram";
    case "BOAT":
      return "mdi:ferry";
    case "TAXI":
      return "mdi:taxi";
    case "BUS":
    default:
      return "mdi:bus";
  }
}

/** Returns a localised platform label for a transport mode */
export function platformLabel(mode: TransportMode | string, platform: string): string {
  if (!platform) return "";
  switch (mode?.toUpperCase()) {
    case "TRAIN":
    case "METRO":
      return `Platform ${platform}`;
    case "BOAT":
      return `Bay ${platform}`;
    default:
      return `Stop ${platform}`;
  }
}

/** Formats a delay in seconds to ±Xm string */
export function formatDelay(delaySeconds: number): string {
  const minutes = Math.round(delaySeconds / 60);
  if (minutes === 0) return "";
  return minutes > 0 ? `+${minutes}m` : `${minutes}m`;
}

/** Validates that a string is a non-empty entity ID */
export function isValidEntityId(id: string): boolean {
  return typeof id === "string" && id.includes(".");
}
