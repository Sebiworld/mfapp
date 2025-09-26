import { AxiosResponse } from "axios";
import { axiosInstance } from "./axios";
import { PageCardDto } from "@models/page/page-card-dto.model";

export interface GetPageListResponse {
  hash?: string;
  items: PageCardDto[];
}

export const pageListApi = {
  getArticles: (
    projectId?: number,
    params?: {
      [key: string]: unknown;
    }
  ): Promise<AxiosResponse<GetPageListResponse | undefined>> =>
    axiosInstance({
      method: "GET",
      url: `/page-list/articles/${projectId ?? ""}`,
      params,
      transformResponse: (response): GetPageListResponse | undefined => {
        if (!response) {
          return;
        }

        try {
          const json = JSON.parse(response);
          return json as GetPageListResponse;
        } catch (e) {
          throw new Error("Could not parse response");
        }
      },
    }),

  getGalleries: (
    projectId?: number,
    params?: {
      [key: string]: unknown;
    }
  ): Promise<AxiosResponse<GetPageListResponse | undefined>> =>
    axiosInstance({
      method: "GET",
      url: `/page-list/galleries/${projectId ?? ""}`,
      params,
      transformResponse: (response): GetPageListResponse | undefined => {
        if (!response) {
          return;
        }

        try {
          const json = JSON.parse(response);
          return json as GetPageListResponse;
        } catch (e) {
          throw new Error("Could not parse response");
        }
      },
    }),
};
