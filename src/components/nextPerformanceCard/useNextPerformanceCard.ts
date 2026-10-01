import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePerformancesApi } from "@api/hooks/usePerformancesApi";
import { NextPerformancesDto } from "@models/utility-types/next-performances-dto.model";
import { isError } from "@utils/functions/isError";
import { useSecondClock } from "@utils/hooks/useSecondClock";
import {
  getNextPerformanceCardState,
  getNextPerformanceCardStateKey,
  NextPerformanceCardState,
} from "./functions/getNextPerformanceCardState";

interface LoadedData {
  projectId: number | undefined;
  response: NextPerformancesDto;
}

interface UseNextPerformanceCardOutput {
  state: NextPerformanceCardState | null;
  /** Current time in milliseconds, updated every second. */
  nowMs: number;
}

/**
 * Loads the current and next performance and derives the card state from a clock that ticks every second.
 * The data is kept in component state only: it describes a moment in time and must not outlive the visit.
 * Whenever the phase or the shown performance changes, the data is loaded again (with its hash, so an
 * unchanged answer costs a 204).
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
  const [loaded, setLoaded] = useState<LoadedData | null>(null);
  const hashRef = useRef<{ projectId: number | undefined; hash: string }>(null);

  const load = useCallback(
    async (isCurrent: () => boolean): Promise<void> => {
      const lastHash = hashRef.current;
      const hash =
        lastHash && lastHash.projectId === projectId
          ? lastHash.hash
          : undefined;
      const response = await loadNextPerformances(projectId, hash);

      if (!isCurrent() || response === true || isError(response)) {
        return;
      }

      hashRef.current = { projectId, hash: response.hash };
      setLoaded({ projectId, response });
    },
    [loadNextPerformances, projectId]
  );

  useEffect(() => {
    let isCurrent = true;

    void load(() => isCurrent);

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
