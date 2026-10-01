import { useEffect, useState } from "react";
import { usePerformancesApi } from "@api/hooks/usePerformancesApi";
import { isError } from "@utils/functions/isError";
import {
  collectFilmstripItems,
  FilmstripItem,
} from "./functions/collectFilmstripItems";

/** One shared empty list keeps the result stable while nothing is loaded. */
const NO_ITEMS: FilmstripItem[] = [];

interface LoadedItems {
  performanceId: number;
  items: FilmstripItem[];
}

/**
 * Loads the playing cast of a performance for the filmstrip.
 * @param performanceId Performance to load; `null` loads nothing.
 * @returns The people of the performance; empty while loading, on errors and without a performance.
 */
export const useFilmstripItems = (
  performanceId: number | null
): FilmstripItem[] => {
  const { loadPerformance } = usePerformancesApi();
  const [loaded, setLoaded] = useState<LoadedItems | null>(null);

  useEffect(() => {
    if (performanceId === null) {
      return;
    }

    let isCurrent = true;

    const load = async (): Promise<void> => {
      const response = await loadPerformance(performanceId);

      if (!isCurrent || isError(response)) {
        return;
      }

      setLoaded({ performanceId, items: collectFilmstripItems(response) });
    };

    void load();

    return () => {
      isCurrent = false;
    };
  }, [loadPerformance, performanceId]);

  return loaded && loaded.performanceId === performanceId
    ? loaded.items
    : NO_ITEMS;
};
