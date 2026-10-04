import { parseString } from "@utils/functions/parseString";
import { NextPerformancesDto } from "@models/utility-types/next-performances-dto.model";

/** Result of a next-performances request: data, `true` for an unchanged answer (204), or the request error. */
export type NextPerformancesResult = NextPerformancesDto | true | Error;

/**
 * A prefetched answer is only handed out for this long: the data describes a moment in time, and the card
 * that takes it over reloads on its own afterwards.
 */
export const NEXT_PERFORMANCES_PREFETCH_MAX_AGE_MS = 60_000;

export interface NextPerformancesPrefetch {
  projectId: number | undefined;
  startedAt: number;
  promise: Promise<NextPerformancesResult>;
  /** Set once the request has finished. */
  result?: NextPerformancesResult;
}

// Kept in memory only (not in the persisted store), so it never outlives the visit.
let prefetch: NextPerformancesPrefetch | null = null;

/**
 * Loads the next performances once for everyone who asks within a short time: the app initialization (to have
 * the card's data before the splash screen goes) and the card's first load join the same request, whichever
 * of them starts it. A failed request is not shared with later callers, they start a new one.
 * @param load Request function, e.g. `loadNextPerformances` of `usePerformancesApi`; it must not throw.
 * @param projectId Project page id, or none for all projects (home page).
 * @returns The shared result; the promise never rejects.
 */
export const loadSharedNextPerformances = (
  load: (projectId?: number, hash?: string) => Promise<NextPerformancesResult>,
  projectId?: number
): Promise<NextPerformancesResult> => {
  const existing = getNextPerformancesPrefetch(projectId);

  if (existing) {
    return existing.promise;
  }

  const entry: NextPerformancesPrefetch = {
    projectId,
    startedAt: Date.now(),
    promise: (async () => {
      try {
        // Without a hash: a first load has no earlier answer to compare with.
        return await load(projectId, undefined);
      } catch (error) {
        return error instanceof Error ? error : new Error(parseString(error) ?? "Unknown error");
      }
    })(),
  };

  prefetch = entry;
  void entry.promise.then((result) => {
    entry.result = result;
  });

  return entry.promise;
};

/**
 * Starts loading the next performances ahead of the card that shows them, so the card can render with its data
 * at once instead of appearing (and shifting the layout) after its own request.
 * @param load Request function, e.g. `loadNextPerformances` of `usePerformancesApi`; it must not throw.
 * @param projectId Project page id, or none for all projects (home page).
 * @returns Promise that resolves once the request has finished; it never rejects.
 */
export const prefetchNextPerformances = async (
  load: (projectId?: number, hash?: string) => Promise<NextPerformancesResult>,
  projectId?: number
): Promise<void> => {
  await loadSharedNextPerformances(load, projectId);
};

/**
 * Returns the shared request for a project while it is fresh and has not failed.
 * @param projectId Project page id, or none for all projects.
 * @returns The pending or finished request, or `null` when there is none for this project, it is too old or
 * it failed.
 */
export const getNextPerformancesPrefetch = (
  projectId?: number
): NextPerformancesPrefetch | null => {
  if (!prefetch || prefetch.projectId !== projectId) {
    return null;
  }

  if (Date.now() - prefetch.startedAt > NEXT_PERFORMANCES_PREFETCH_MAX_AGE_MS) {
    return null;
  }

  if (prefetch.result instanceof Error) {
    return null;
  }

  return prefetch;
};

/** Forgets the shared request, e.g. between tests. */
export const clearNextPerformancesPrefetch = (): void => {
  prefetch = null;
};
