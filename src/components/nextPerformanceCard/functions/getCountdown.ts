export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** Whole seconds left; `0` once the target is reached or passed. */
  totalSeconds: number;
}

/**
 * Splits the time left until a target into days, hours, minutes and seconds.
 * Started seconds count as a full second, so the countdown shows `0` exactly at the target and never goes negative.
 * @param targetSeconds Target as Unix timestamp in seconds.
 * @param nowMs Current time in milliseconds.
 * @returns The parts of the remaining time.
 */
export const getCountdown = (
  targetSeconds: number,
  nowMs: number
): Countdown => {
  const totalSeconds = Math.max(0, Math.ceil(targetSeconds - nowMs / 1000));

  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
    totalSeconds,
  };
};
