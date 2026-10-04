import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePerformancesApi } from "@api/hooks/usePerformancesApi";
import { NextPerformancesDto } from "@models/utility-types/next-performances-dto.model";
import { isError } from "@utils/functions/isError";
import { useSecondClock } from "@utils/hooks/useSecondClock";
import {
  getNextPerformancesPrefetch,
  loadSharedNextPerformances,
  NextPerformancesResult,
} from "@api/prefetch/nextPerformancesPrefetch";
import {
  getNextPerformanceCardState,
  getNextPerformanceCardStateKey,
  NextPerformanceCardState,
} from "./functions/getNextPerformanceCardState";

interface LoadedData {
  projectId: number | undefined;
  response: NextPerformancesDto;
}

/** Delay of the single timed retry after a failed load, for weak networks at the venue. */
const RETRY_DELAY_MS = 15_000;

interface UseNextPerformanceCardOutput {
  state: NextPerformanceCardState | null;
  /** Current time in milliseconds, updated every second. */
  nowMs: number;
}

/**
 * Returns the data of a finished, fresh shared request (see `loadSharedNextPerformances`) for the project, so
 * the card can render with it at once.
 * @param projectId Project page id, or none for all projects.
 * @returns The loaded data, or `null` while there is none.
 */
const getPrefetchedData = (
  projectId: number | undefined
): LoadedData | null => {
  const result = getNextPerformancesPrefetch(projectId)?.result;

  if (!result || result === true || isError(result)) {
    return null;
  }

  return { projectId, response: result };
};

/**
 * Loads the current and next performance and derives the card state from a clock that ticks every second.
 * The data is kept in component state only: it describes a moment in time and must not outlive the visit.
 * The first load shares its request with the app initialization (`loadSharedNextPerformances`); when that one
 * has already finished, the card renders with its data from the first render on.
 * Whenever the phase or the shown performance changes, the data is loaded again (with its hash, so an
 * unchanged answer costs a 204). A failed load is retried when the browser comes back online and once after
 * a short delay.
 * @param projectId Project page id; without it performances of all projects are considered.
 * @param maxDaysAhead When set, upcoming performances further away than this many days are not shown.
 * @returns The card state (`null` without a card) and the current time.
 */
export const useNextPerformanceCard = (
  projectId?: number,
  maxDaysAhead?: number
): UseNextPerformanceCardOutput => {
  const { loadNextPerformances } = usePerformancesApi();
  const nowMs = useSecondClock();
  const [loaded, setLoaded] = useState<LoadedData | null>(() =>
    getPrefetchedData(projectId)
  );
  const [loadFailed, setLoadFailed] = useState(false);
  const hashRef = useRef<{ projectId: number | undefined; hash: string }>(
    loaded ? { projectId, hash: loaded.response.hash } : null
  );

  const load = useCallback(
    async (isCurrent: () => boolean, isFirstLoad = false): Promise<void> => {
      let response: NextPerformancesResult;

      if (isFirstLoad) {
        response = await loadSharedNextPerformances(
          loadNextPerformances,
          projectId
        );
      } else {
        const lastHash = hashRef.current;
        const hash =
          lastHash && lastHash.projectId === projectId
            ? lastHash.hash
            : undefined;

        response = await loadNextPerformances(projectId, hash);
      }

      if (!isCurrent()) {
        return;
      }

      if (isError(response)) {
        setLoadFailed(true);
        return;
      }

      setLoadFailed(false);

      if (response === true) {
        return;
      }

      hashRef.current = { projectId, hash: response.hash };
      setLoaded({ projectId, response });
    },
    [loadNextPerformances, projectId]
  );

  useEffect(() => {
    let isCurrent = true;

    void load(() => isCurrent, true);

    return () => {
      isCurrent = false;
    };
  }, [load]);

  // A visit can last long: coming back to the tab checks once whether the dates changed (unchanged costs a 204).
  useEffect(() => {
    let isCurrent = true;

    const reloadWhenVisible = (): void => {
      if (document.visibilityState === "visible") {
        void load(() => isCurrent);
      }
    };

    document.addEventListener("visibilitychange", reloadWhenVisible);

    return () => {
      isCurrent = false;
      document.removeEventListener("visibilitychange", reloadWhenVisible);
    };
  }, [load]);

  // The card stays invisible after a failed load, so it is tried again. The failed flag stays set across
  // failing retries, which keeps this effect (and with it the timer) from restarting: one timed retry only.
  useEffect(() => {
    if (!loadFailed) {
      return;
    }

    let isCurrent = true;

    const retry = (): void => {
      void load(() => isCurrent);
    };
    const timer = setTimeout(retry, RETRY_DELAY_MS);

    window.addEventListener("online", retry);

    return () => {
      isCurrent = false;
      clearTimeout(timer);
      window.removeEventListener("online", retry);
    };
  }, [load, loadFailed]);

  // Data of another project must not flash up while the new one loads.
  const data =
    loaded && loaded.projectId === projectId ? loaded.response : undefined;

  const state = useMemo(
    () => getNextPerformanceCardState(data, nowMs, maxDaysAhead),
    [data, maxDaysAhead, nowMs]
  );
  const stateKey = getNextPerformanceCardStateKey(state);
  const seenRef = useRef<{ data: NextPerformancesDto; key: string }>(null);

  useEffect(() => {
    if (!data) {
      return;
    }

    // New data only sets the reference point; a reload follows a change of the clock, not of the data.
    if (seenRef.current?.data !== data) {
      seenRef.current = { data, key: stateKey };
      return;
    }

    if (seenRef.current.key === stateKey) {
      return;
    }

    seenRef.current.key = stateKey;

    let isCurrent = true;

    void load(() => isCurrent);

    return () => {
      isCurrent = false;
    };
  }, [data, load, stateKey]);

  return { state, nowMs };
};
