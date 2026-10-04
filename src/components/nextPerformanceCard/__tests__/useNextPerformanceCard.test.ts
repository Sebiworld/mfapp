import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import {
  NextPerformanceItemDto,
  NextPerformancesDto,
} from "@models/utility-types/next-performances-dto.model";
import {
  clearNextPerformancesPrefetch,
  NEXT_PERFORMANCES_PREFETCH_MAX_AGE_MS,
  NextPerformancesResult,
  prefetchNextPerformances,
} from "@api/prefetch/nextPerformancesPrefetch";
import { useNextPerformanceCard } from "../useNextPerformanceCard";
import { NextPerformanceCardState } from "../functions/getNextPerformanceCardState";

const loadNextPerformances = vi.fn();
vi.mock("@api/hooks/usePerformancesApi", () => ({
  usePerformancesApi: () => ({ loadNextPerformances }),
}));

// 2026-10-01T17:30:00Z
const NOW = 1_790_875_800;
const DAY = 86_400;

const NEXT: NextPerformanceItemDto = {
  id: 11,
  title: "Abendvorstellung",
  timestamp: NOW + DAY,
  timestamp_until: null,
  admission_minutes: null,
  hall_admission_minutes: null,
  ticket_url: null,
  event: { id: 9, title: "Premiere" },
  project: { id: 5, title: "Annie", url: "/projekte/annie/" },
  casts: [],
};

const ANSWER: NextPerformancesDto = { current: null, next: NEXT, hash: "h1" };

/**
 * Lets pending promises and timers run inside `act`.
 * @param ms Fake time to advance.
 */
const flush = async (ms = 0): Promise<void> => {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
};

/**
 * Renders the hook and records the state of every render.
 * @param projectId Project id passed to the hook.
 * @returns The recorded states and the render result.
 */
const renderCardHook = (
  projectId?: number
): {
  states: (NextPerformanceCardState | null)[];
  result: { current: ReturnType<typeof useNextPerformanceCard> };
} => {
  const states: (NextPerformanceCardState | null)[] = [];
  const { result } = renderHook(() => {
    const output = useNextPerformanceCard(projectId);
    states.push(output.state);

    return output;
  });

  return { states, result };
};

describe("useNextPerformanceCard with a request from the app initialization", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW * 1000);
    clearNextPerformancesPrefetch();
    loadNextPerformances.mockResolvedValue(ANSWER);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders with the finished answer from the first render on, without its own request", async () => {
    await prefetchNextPerformances(async () => ANSWER);

    const { states } = renderCardHook();
    await flush();

    expect(states[0]?.performance.id).toBe(11);
    expect(loadNextPerformances).not.toHaveBeenCalled();
  });

  it("waits for a pending request instead of starting a second one", async () => {
    let answer: (value: NextPerformancesResult) => void = () => undefined;
    void prefetchNextPerformances(
      () =>
        new Promise<NextPerformancesResult>((resolve) => {
          answer = resolve;
        })
    );

    const { result } = renderCardHook();
    await flush();
    expect(result.current.state).toBeNull();

    answer(ANSWER);
    await flush();

    expect(result.current.state?.performance.id).toBe(11);
    expect(loadNextPerformances).not.toHaveBeenCalled();
  });

  it("checks for changes with the hash of the taken-over answer when the tab becomes visible", async () => {
    await prefetchNextPerformances(async () => ANSWER);
    renderCardHook();
    await flush();

    await act(async () => {
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await flush();

    expect(loadNextPerformances).toHaveBeenCalledWith(undefined, "h1");
  });

  it("keeps the retries when the shared request fails: when back online and once after the delay", async () => {
    let answer: (value: NextPerformancesResult) => void = () => undefined;
    void prefetchNextPerformances(
      () =>
        new Promise<NextPerformancesResult>((resolve) => {
          answer = resolve;
        })
    );

    const { result } = renderCardHook();
    await flush();
    answer(new Error("offline"));
    await flush();

    expect(result.current.state).toBeNull();
    expect(loadNextPerformances).not.toHaveBeenCalled();

    loadNextPerformances.mockResolvedValueOnce(new Error("offline"));
    await flush(15_000);
    expect(loadNextPerformances).toHaveBeenCalledTimes(1);

    await act(async () => {
      window.dispatchEvent(new Event("online"));
    });
    await flush();

    expect(loadNextPerformances).toHaveBeenCalledTimes(2);
    expect(result.current.state?.performance.id).toBe(11);
  });

  it("does not take over a failed request but loads on its own", async () => {
    await prefetchNextPerformances(async () => new Error("offline"));

    const { result } = renderCardHook();
    await flush();

    expect(loadNextPerformances).toHaveBeenCalledTimes(1);
    expect(result.current.state?.performance.id).toBe(11);
  });

  it("lets a later initialization join the card's own first request", async () => {
    let answer: (value: NextPerformancesResult) => void = () => undefined;
    loadNextPerformances.mockImplementationOnce(
      () =>
        new Promise<NextPerformancesResult>((resolve) => {
          answer = resolve;
        })
    );

    const { result } = renderCardHook();
    await flush();
    const initializationLoad = vi.fn(async () => ANSWER);
    const initialization = prefetchNextPerformances(initializationLoad);
    answer(ANSWER);
    await initialization;
    await flush();

    expect(initializationLoad).not.toHaveBeenCalled();
    expect(loadNextPerformances).toHaveBeenCalledTimes(1);
    expect(result.current.state?.performance.id).toBe(11);
  });

  it("ignores a request for another project", async () => {
    await prefetchNextPerformances(async () => ANSWER);

    const { states } = renderCardHook(5);
    await flush();

    expect(states[0]).toBeNull();
    expect(loadNextPerformances).toHaveBeenCalledWith(5, undefined);
  });

  it("ignores a request that is too old and loads again", async () => {
    await prefetchNextPerformances(async () => ANSWER);
    vi.setSystemTime(NOW * 1000 + NEXT_PERFORMANCES_PREFETCH_MAX_AGE_MS + 1);

    const { states } = renderCardHook();
    await flush();

    expect(states[0]).toBeNull();
    expect(loadNextPerformances).toHaveBeenCalledTimes(1);
  });
});
