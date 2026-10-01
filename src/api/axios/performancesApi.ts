import { AxiosResponse } from "axios";
import { axiosInstance } from "./axios";
import { PerformanceDetailDto } from "@models/utility-types/performance-detail-dto.model";
import { NextPerformancesDto } from "@models/utility-types/next-performances-dto.model";

export const performancesApi = {
  getPerformance: (
    id: number,
    params?: { [key: string]: unknown }
  ): Promise<AxiosResponse<PerformanceDetailDto | undefined>> =>
    axiosInstance({
      method: "GET",
      url: `/performances/${id}`,
      params,
      transformResponse: (response): PerformanceDetailDto | undefined => {
        if (!response) {
          return;
        }

        try {
          return JSON.parse(response) as PerformanceDetailDto;
        } catch (e) {
          console.warn(e);
          throw new Error("Could not parse response");
        }
      },
    }),

  getNextPerformances: (params?: {
    project?: number;
    hash?: string;
  }): Promise<AxiosResponse<NextPerformancesDto | undefined>> =>
    axiosInstance({
      method: "GET",
      url: "/performances/next",
      params,
      transformResponse: (response): NextPerformancesDto | undefined => {
        // 204 (unchanged) arrives without a body.
        if (!response) {
          return;
        }

        try {
          return JSON.parse(response) as NextPerformancesDto;
        } catch (e) {
          console.warn(e);
          throw new Error("Could not parse response");
        }
      },
    }),
};
