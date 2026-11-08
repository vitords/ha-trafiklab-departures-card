/**
 * Wraps a single departure's timing information from the Trafiklab sensor.
 *
 * Relies on pre-computed values from the sensor (`minutesUntil`, `timeFormatted`).
 * The sensor derives `timeFormatted` from realtime time, falling back to scheduled.
 *
 * `minutesUntil` is only correct at the moment the sensor state was written, so it
 * is aged from `asOf` (the state's `last_updated`). Rows get rebuilt every few
 * seconds, so this must not be the time the object was created.
 */
export class DepartureTime {
  readonly delayMinutes: number;
  readonly canceled: boolean;
  readonly realTime: boolean;

  private readonly _minutesUntil: number | null;
  private readonly _timeFormatted: string | null;
  /** Timestamp (ms) at which _minutesUntil was computed */
  private readonly _asOf: number;

  constructor(opts: {
    delayMinutes?: number;
    canceled?: boolean;
    realTime?: boolean;
    minutesUntil?: number | null;
    timeFormatted?: string | null;
    asOf?: number;
  }) {
    this.delayMinutes = opts.delayMinutes ?? 0;
    this.canceled = opts.canceled ?? false;
    this.realTime = opts.realTime ?? false;
    this._minutesUntil = opts.minutesUntil ?? null;
    this._timeFormatted = opts.timeFormatted ?? null;
    this._asOf = opts.asOf ?? Date.now();
  }

  /** Unrounded minutes until departure, or null when the sensor gave no time */
  private _exactDiff(): number | null {
    if (this._minutesUntil === null) return null;
    // Clamp so a tablet clock running behind HA can't add time to the countdown
    const elapsedMinutes = Math.max(0, Date.now() - this._asOf) / 60_000;
    return this._minutesUntil - elapsedMinutes;
  }

  /** Minutes until departure, aged from when the sensor computed it */
  timeDiff(): number {
    const diff = this._exactDiff();
    return diff === null ? 0 : Math.round(diff);
  }

  /**
   * True once the departure is over a minute past. The sensor truncates
   * `minutes_until`, so anything sooner may not have left yet.
   */
  hasDeparted(): boolean {
    const diff = this._exactDiff();
    return diff !== null && diff < -1;
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
