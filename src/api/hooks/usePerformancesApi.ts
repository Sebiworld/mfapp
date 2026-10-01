import { MFApi } from "@api/axios/mfApi";
import { PerformanceDetailDto } from "@models/utility-types/performance-detail-dto.model";
import { NextPerformancesDto } from "@models/utility-types/next-performances-dto.model";
import { useCallback } from "react";

interface UsePerformancesApiOutput {
  loadPerformance: (id: number) => Promise<PerformanceDetailDto | Error>;
  loadNextPerformances: (
    projectId?: number,
    hash?: string
  ) => Promise<NextPerformancesDto | true | Error>;
}

/**
 * API access for performances. Responses are not written to the global store: the filtered roles share their
 * ids with the project roles and must not replace them, and the next performances depend on the time of the
 * request, so a persisted copy would be stale on the next visit.
 * @returns `loadPerformance`, which resolves with the performance or the request error, and
 * `loadNextPerformances`, which resolves with the current and next performance, `true` when the data is
 * unchanged since `hash` (204), or the request error.
 */
export const usePerformancesApi = (): UsePerformancesApiOutput => {
  const loadPerformance = useCallback(
    async (id: number): Promise<PerformanceDetailDto | Error> => {
      try {
        const response = await MFApi.getPerformance(id);
        const performance = response.data;

        if (!performance?.id) {
          throw new Error("Invalid performance data received");
        }

        return performance;
      } catch (error) {
        console.error("Error in data fetch:", error);
        return error as Error;
      }
    },
    []
  );

  const loadNextPerformances = useCallback(
    async (
      projectId?: number,
      hash?: string
    ): Promise<NextPerformancesDto | true | Error> => {
      try {
        const response = await MFApi.getNextPerformances({
          ...(projectId ? { project: projectId } : {}),
          ...(hash ? { hash } : {}),
        });

        if (response.status === 204) {
          return true;
        }

        const data = response.data;

        if (!data || typeof data.hash !== "string") {
          throw new Error("Invalid next performances data received");
        }

        return data;
      } catch (error) {
        console.error("Error in data fetch:", error);
        return error as Error;
      }
    },
    []
  );

  return { loadPerformance, loadNextPerformances };
};
