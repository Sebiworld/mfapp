import { DefaultPageDto } from "@models/page/default-page-dto.model";
import { AxiosResponse } from "axios";
import { axiosInstance } from "./axios";

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
};
