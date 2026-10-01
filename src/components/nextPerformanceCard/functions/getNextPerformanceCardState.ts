import {
  NextPerformanceItemDto,
  NextPerformancesDto,
} from "@models/utility-types/next-performances-dto.model";
import {
  getAdmissionTimes,
  getAdmissionTimestamp,
} from "@pages/performancePage/functions/getPerformanceTimes";

/** Running time assumed for performances without an end, in seconds; matches the backend. */
export const DEFAULT_DURATION_SECONDS = 3 * 60 * 60;

export type NextPerformanceCardPhase =
  "before" | "admission" | "foyer" | "hall" | "running";

export interface NextPerformanceCardState {
  /**
   * `before`: counting down; `admission`: the only admission is open; `foyer` / `hall`: admission into foyer or
   * hall is open; `running`: the performance is on.
   */
  phase: NextPerformanceCardPhase;
  /** The performance the card is about. */
  performance: NextPerformanceItemDto;
  /** Performance whose start the countdown counts to; `null` while running without a later one. */
  countdownTarget: NextPerformanceItemDto | null;
}

interface PerformanceWindow {
  /** First admission in seconds; equals `start` without an admission time. */
  opens: number;
  start: number;
  end: number;
}

/**
 * Computes when a performance is shown as current.
 * @param performance Performance with start, end and admission time.
 * @returns Admission start, start and end in seconds; without an end the default running time is used.
 */
const getWindow = (performance: NextPerformanceItemDto): PerformanceWindow => {
  const start = performance.timestamp;
  const until = performance.timestamp_until;
  const end =
    typeof until === "number" && until > start
      ? until
      : start + DEFAULT_DURATION_SECONDS;

  return { opens: getAdmissionTimestamp(performance) ?? start, start, end };
};

/**
 * Decides which part of its window a current performance is in.
 * @param performance A performance whose window contains `now`.
 * @param now Current time in seconds.
 * @returns `running` from the start, `admission` with a single admission time, `hall` once the hall is open,
 * otherwise `foyer`.
 */
const getActivePhase = (
  performance: NextPerformanceItemDto,
  now: number
): NextPerformanceCardPhase => {
  if (now >= performance.timestamp) {
    return "running";
  }

  const { common, hall } = getAdmissionTimes(performance);

  if (common !== null) {
    return "admission";
  }

  return hall !== null && now >= hall ? "hall" : "foyer";
};

/**
 * Decides what the next performance card shows at a given moment. The phase is derived from the local clock,
 * so it changes on time even before the data is reloaded.
 * @param data Response of `performances/next`; `undefined` while nothing is loaded.
 * @param nowMs Current time in milliseconds.
 * @param maxDaysAhead When set, an upcoming performance further away than this many days is not shown.
 * @returns The state of the card, or `null` when no card should be shown.
 */
export const getNextPerformanceCardState = (
  data: NextPerformancesDto | undefined,
  nowMs: number,
  maxDaysAhead?: number
): NextPerformanceCardState | null => {
  const now = nowMs / 1000;
  const candidates: NextPerformanceItemDto[] = [];

  for (const item of [data?.current, data?.next]) {
    if (
      item &&
      typeof item.timestamp === "number" &&
      !candidates.some((candidate) => candidate.id === item.id)
    ) {
      candidates.push(item);
    }
  }

  candidates.sort((a, b) => a.timestamp - b.timestamp);

  const active = candidates.find((item) => {
    const window = getWindow(item);

    return window.opens <= now && now < window.end;
  });
  const upcoming = candidates.find(
    (item) => item !== active && item.timestamp > now
  );

  if (active) {
    const phase = getActivePhase(active, now);
    const isAdmission = phase !== "running";

    return {
      phase,
      performance: active,
      countdownTarget: isAdmission ? active : (upcoming ?? null),
    };
  }

  if (!upcoming) {
    return null;
  }

  if (
    maxDaysAhead !== undefined &&
    upcoming.timestamp > now + maxDaysAhead * 86_400
  ) {
    return null;
  }

  return { phase: "before", performance: upcoming, countdownTarget: upcoming };
};

/**
 * Builds a key that changes whenever the card switches to another phase or performance.
 * @param state State from `getNextPerformanceCardState`.
 * @returns Key such as `running:12:13`, or `none` without a card.
 */
export const getNextPerformanceCardStateKey = (
  state: NextPerformanceCardState | null
): string => {
  if (!state) {
    return "none";
  }

  return `${state.phase}:${state.performance.id}:${state.countdownTarget?.id ?? "-"}`;
};
