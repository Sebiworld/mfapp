import { PerformanceDetailDto } from "@models/utility-types/performance-detail-dto.model";

type PerformanceTimes = Pick<
  PerformanceDetailDto,
  "timestamp" | "timestamp_until" | "admission_minutes"
>;

/**
 * Computes the admission time of a performance.
 * @param performance Performance with `timestamp` and `admission_minutes`.
 * @returns Unix timestamp in seconds, or `null` when no admission time is set (missing or 0 minutes).
 */
export const getAdmissionTimestamp = (
  performance: PerformanceTimes
): number | null => {
  const minutes = performance.admission_minutes;

  if (performance.timestamp === null) {
    return null;
  }

  if (
    typeof minutes !== "number" ||
    !Number.isFinite(minutes) ||
    minutes <= 0
  ) {
    return null;
  }

  return performance.timestamp - minutes * 60;
};

/**
 * Computes the running time of a performance.
 * @param performance Performance with `timestamp` and `timestamp_until`.
 * @returns Whole minutes, or `null` when the end is missing or not after the start.
 */
export const getDurationMinutes = (
  performance: PerformanceTimes
): number | null => {
  const until = performance.timestamp_until;

  if (
    performance.timestamp === null ||
    typeof until !== "number" ||
    until <= performance.timestamp
  ) {
    return null;
  }

  return Math.round((until - performance.timestamp) / 60);
};

/**
 * Rounds a running time to the nearest half hour.
 * @param minutes Whole minutes.
 * @returns Hours in steps of 0.5; `0` for runs shorter than a quarter hour.
 */
export const roundToHalfHours = (minutes: number): number =>
  Math.round(minutes / 30) / 2;

/**
 * Describes the running time for the start line, e.g. `Dauer ca. 2,5 Stunden`.
 * @param performance Performance with `timestamp` and `timestamp_until`.
 * @param t Translation function.
 * @returns Text, or `null` when there is no usable end.
 */
export const getDurationLabel = (
  performance: PerformanceTimes,
  t: (key: string, options?: Record<string, unknown>) => string
): string | null => {
  const minutes = getDurationMinutes(performance);
  const hours = minutes === null ? 0 : roundToHalfHours(minutes);

  if (hours === 0) {
    return null;
  }

  if (hours === 1) {
    return t("performance.duration-one");
  }

  return t("performance.duration-other", {
    hours: hours.toLocaleString("de-DE"),
  });
};

export interface PerformanceStatus {
  /** True from the start on: tickets can no longer be bought. */
  ticketsClosed: boolean;
  /** True from the end on (or the start, when no end is known). */
  hasEnded: boolean;
}

/**
 * Tells how far a performance has progressed.
 * @param performance Performance with `timestamp` and `timestamp_until`.
 * @param nowMs Current time in milliseconds.
 * @returns Whether ticket sales are over and whether the performance has ended; both flip exactly at the boundary.
 * Without a start both are false.
 */
export const getPerformanceStatus = (
  performance: PerformanceTimes,
  nowMs: number
): PerformanceStatus => {
  if (performance.timestamp === null) {
    return { ticketsClosed: false, hasEnded: false };
  }

  const until = performance.timestamp_until;
  const end =
    typeof until === "number" && until > performance.timestamp
      ? until
      : performance.timestamp;

  return {
    ticketsClosed: nowMs >= performance.timestamp * 1000,
    hasEnded: nowMs >= end * 1000,
  };
};
