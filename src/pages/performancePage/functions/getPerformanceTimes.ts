import { PerformanceDetailDto } from "@models/utility-types/performance-detail-dto.model";

type PerformanceTimes = Pick<
  PerformanceDetailDto,
  "timestamp" | "timestamp_until"
>;

type PerformanceAdmission = Pick<
  PerformanceDetailDto,
  "timestamp" | "admission_minutes" | "hall_admission_minutes"
>;

export interface AdmissionTimes {
  /** The only admission in seconds, when there are not two separate ones; then `foyer` and `hall` are `null`. */
  common: number | null;
  /** Opening of the foyer in seconds; set only together with a later `hall`. */
  foyer: number | null;
  /** Opening of the hall in seconds; set only together with an earlier `foyer`. */
  hall: number | null;
}

/**
 * Turns minutes before the start into a point in time.
 * @param start Start in seconds.
 * @param minutes Minutes before the start; missing, 0 or invalid means not set.
 * @returns Unix timestamp in seconds, or `null` when not set.
 */
const minutesBefore = (
  start: number,
  minutes: number | null | undefined
): number | null => {
  if (
    typeof minutes !== "number" ||
    !Number.isFinite(minutes) ||
    minutes <= 0
  ) {
    return null;
  }

  return start - minutes * 60;
};

/**
 * Computes when foyer and hall open. Foyer and hall are told apart only when the foyer opens before the hall;
 * in every other case visitors get a single admission time, the earliest one that is set.
 * @param performance Performance with `timestamp`, `admission_minutes` (foyer) and `hall_admission_minutes`.
 * @returns Opening times in seconds; all `null` without a start or without any admission time.
 */
export const getAdmissionTimes = (
  performance: PerformanceAdmission
): AdmissionTimes => {
  if (performance.timestamp === null) {
    return { common: null, foyer: null, hall: null };
  }

  const hall = minutesBefore(
    performance.timestamp,
    performance.hall_admission_minutes
  );
  const foyer = minutesBefore(
    performance.timestamp,
    performance.admission_minutes
  );

  if (foyer !== null && hall !== null && foyer < hall) {
    return { common: null, foyer, hall };
  }

  const earliest =
    foyer !== null && hall !== null ? Math.min(foyer, hall) : (foyer ?? hall);

  return { common: earliest, foyer: null, hall: null };
};

/**
 * Computes the first admission of a performance, into the foyer or the hall, whichever opens first.
 * @param performance Performance with `timestamp` and both admission times.
 * @returns Unix timestamp in seconds, or `null` when no admission time is set (missing or 0 minutes).
 */
export const getAdmissionTimestamp = (
  performance: PerformanceAdmission
): number | null => {
  const { common, foyer, hall } = getAdmissionTimes(performance);

  return common ?? foyer ?? hall;
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
