import { MFApi } from "@api/axios/mfApi";
import { PerformanceDetailDto } from "@models/utility-types/performance-detail-dto.model";
import { useCallback } from "react";

interface UsePerformancesApiOutput {
  loadPerformance: (id: number) => Promise<PerformanceDetailDto | Error>;
}

/**
 * API access for single performances. Responses are not written to the global store: the filtered roles
 * share their ids with the project roles and must not replace them.
 * @returns `loadPerformance`, which resolves with the performance or the request error.
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

  return { loadPerformance };
};
