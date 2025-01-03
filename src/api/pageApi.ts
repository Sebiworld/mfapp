import { DefaultPageDto } from "@models/page/default-page-dto.model";
import { AxiosResponse } from "axios";
import { axiosInstance } from "./axios";
import { FormValidationResponseDto } from "@models/utility-types/form-validation-response-dto.model";
import { isValidObject } from "@utils/functions/isValidObject";

export const pageApi = {
  getPage: (
    path: string,
    params?: { [key: string]: unknown }
  ): Promise<AxiosResponse<DefaultPageDto | undefined>> =>
    axiosInstance({
      method: "GET",
      url: `/tpage${(path?.[0] !== "/" ? "/" : "") + path}`,
      params,
      transformResponse: (response): DefaultPageDto | undefined => {
        if (!response) {
          return;
        }

        try {
          const json = JSON.parse(response);
          return json as DefaultPageDto;
        } catch (e) {
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

      transformResponse: (response): DefaultPageDto | undefined => {
        if (!response) {
          return;
        }

        try {
          const json = JSON.parse(response);
          return json as DefaultPageDto;
        } catch (e) {
          throw new Error("Could not parse response");
        }
      },
    });
  },
};
