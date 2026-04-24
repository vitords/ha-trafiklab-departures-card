/**
 * Wraps a single departure's timing information from the Trafiklab sensor.
 *
 * Relies on pre-computed values from the sensor (`minutesUntil`, `timeFormatted`).
 * The sensor derives `timeFormatted` from realtime time, falling back to scheduled.
 */
export class DepartureTime {
  readonly delayMinutes: number;
  readonly canceled: boolean;
  readonly realTime: boolean;

  private readonly _minutesUntil: number | null;
  private readonly _timeFormatted: string | null;
  /** Timestamp when this object was created, to age _minutesUntil correctly */
  private readonly _createdAt: number;

  constructor(opts: {
    delayMinutes?: number;
    canceled?: boolean;
    realTime?: boolean;
    minutesUntil?: number | null;
    timeFormatted?: string | null;
  }) {
    this.delayMinutes = opts.delayMinutes ?? 0;
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
    return 0;
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

  /** HH:mm for the effective departure time (realtime if available, else scheduled) */
  timeStr(): string {
    return this._timeFormatted || "--:--";
  }

  /** Human-readable countdown: "Now"/"Nu", "Xm", or "HH:MM" for >60m */
  timeDiffStr(nowStr = "Now"): string {
    const diff = this.timeDiff();
    if (diff <= 0) return nowStr;
    if (diff < 60) return `${diff}m`;
    return this.timeStr();
  }
}
