/**
 * Wraps a single departure's timing information from the Trafiklab sensor.
 *
 * Prefers pre-computed values from the sensor (`minutesUntil`, `timeFormatted`)
 * over re-parsing ISO timestamps, which avoids timezone ambiguity.
 */
export class DepartureTime {
  readonly delaySeconds: number;
  readonly canceled: boolean;
  readonly realTime: boolean;

  /** Pre-computed minutes from sensor (snapshot at last sensor update) */
  private readonly _minutesUntil: number | null;
  /** Pre-computed HH:MM string from sensor for the scheduled time */
  private readonly _timeFormatted: string | null;
  /** Parsed scheduled time, used as fallback for HH:MM display */
  private readonly _planned: Date;
  /** Parsed estimated time, used as fallback for HH:MM display */
  private readonly _estimated: Date;
  /** Timestamp when this object was created, to age _minutesUntil correctly */
  private readonly _createdAt: number;

  constructor(opts: {
    planned: Date;
    estimated: Date;
    delaySeconds?: number;
    canceled?: boolean;
    realTime?: boolean;
    minutesUntil?: number | null;
    timeFormatted?: string | null;
  }) {
    this._planned = opts.planned;
    this._estimated = opts.estimated;
    this.delaySeconds = opts.delaySeconds ?? 0;
    this.canceled = opts.canceled ?? false;
    this.realTime = opts.realTime ?? false;
    this._minutesUntil = opts.minutesUntil ?? null;
    this._timeFormatted = opts.timeFormatted ?? null;
    this._createdAt = Date.now();
  }

  /** Minutes until departure, aged from when the object was created */
  timeDiff(): number {
    if (this._minutesUntil !== null) {
      const elapsedMinutes = (Date.now() - this._createdAt) / 60_000;
      return Math.round(this._minutesUntil - elapsedMinutes);
    }
    // Fallback: compute from parsed timestamps
    const ref = isValidDate(this._estimated) ? this._estimated : this._planned;
    return Math.round((ref.getTime() - Date.now()) / 60_000);
  }

  /** Delay in whole minutes */
  get delayMinutes(): number {
    return Math.round(this.delaySeconds / 60);
  }

  isDelayed(): boolean {
    return this.delayMinutes > 0;
  }

  isEarlier(): boolean {
    return this.delayMinutes < 0;
  }

  /** Returns true when the departure is within `offsetMinutes` minutes */
  isArriving(offsetMinutes: number = 2): boolean {
    const diff = this.timeDiff();
    return diff >= 0 && diff <= offsetMinutes;
  }

  /** HH:mm for the scheduled departure */
  plannedTimeStr(): string {
    if (this._timeFormatted) return this._timeFormatted;
    return formatHHMM(this._planned);
  }

  /** HH:mm for the estimated departure */
  estimatedTimeStr(): string {
    if (isValidDate(this._estimated)) return formatHHMM(this._estimated);
    return this.plannedTimeStr();
  }

  /** Human-readable countdown: "Now", "Xm", or "HH:MM" for >60m */
  timeDiffStr(): string {
    const diff = this.timeDiff();
    if (diff <= 0) return "Now";
    if (diff < 60) return `${diff}m`;
    return this.plannedTimeStr();
  }
}

function isValidDate(d: Date): boolean {
  return d instanceof Date && !isNaN(d.getTime());
}

function formatHHMM(date: Date): string {
  if (!isValidDate(date)) return "--:--";
  return date.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
}
