import { DefaultPageDto } from "@models/page/default-page-dto.model";
import { AxiosResponse } from "axios";
import { axiosInstance } from "./axios";
import { FormValidationResponseDto } from "@models/utility-types/form-validation-response-dto.model";
import { isValidObject } from "@utils/functions/isValidObject";
import { PageCardDto } from "@models/page/page-card-dto.model";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";

export interface GetPageListResponse {
  hash?: string;
  items: PageCardDto[];
  lastElementIndex: number;
  moreAvailable: boolean;
  totalNumber: number;
}

export interface PageListPositioning {
  lastElementIndex: number;
  moreAvailable: boolean;
  totalNumber: number;
}

export const pageApi = {
  getPage: (
    path: string,
    params?: { [key: string]: unknown }
  ): Promise<AxiosResponse<PageDtoVariant | undefined>> =>
    axiosInstance({
      method: "GET",
      url: `/tpage${(path?.[0] !== "/" ? "/" : "") + path}`,
      params,
      transformResponse: (response): PageDtoVariant | undefined => {
        if (!response) {
          return;
        }

        try {
          const json = JSON.parse(response);
          return json as DefaultPageDto;
        } catch (e) {
          console.warn(e);
          throw new Error("Could not parse response");
        }
      },
    }),

  submitPageForm: (
    path: string,
    formOrigin: number,
    params?: { [key: string]: unknown }
  ): Promise<AxiosResponse<FormValidationResponseDto | undefined>> => {
    const requestParams = isValidObject(params) ? { ...params } : {};
    requestParams["form-origin"] = formOrigin;

    return axiosInstance({
      method: "POST",
      url: `/tpage${(path?.[0] !== "/" ? "/" : "") + path}`,
      data: requestParams,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },

      transformResponse: (response): FormValidationResponseDto | undefined => {
        if (!response) {
          return;
        }

        try {
          const json = JSON.parse(response);
          return json as FormValidationResponseDto;
        } catch (e) {
          console.warn(e);
          throw new Error("Could not parse response");
        }
      },
    });
  },

  getPageListItems: (
    projectId?: number,
    params?: {
      [key: string]: unknown;
    }
  ): Promise<AxiosResponse<GetPageListResponse | undefined>> =>
    axiosInstance({
      method: "GET",
      url: `/page-list/items/${projectId ?? ""}`,
      params,
      transformResponse: (response): GetPageListResponse | undefined => {
        if (!response) {
          return;
        }

        try {
          const json = JSON.parse(response);
          return json as GetPageListResponse;
        } catch (e) {
          console.warn(e);
          throw new Error("Could not parse response");
        }
      },
    }),
};
