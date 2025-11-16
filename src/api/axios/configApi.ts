import { AxiosResponse } from "axios";
import { axiosInstance } from "./axios";
import { NavigationItemDto } from "@models/navigation-item-dto.model";
import { ConfigurationDto } from "@models/utility-types/configuration-dto.model";

export interface GetConfigurationResponse {
  configuration: ConfigurationDto;
  hash?: string;
}

export interface GetMenuesResponse {
  main_navigation: NavigationItemDto[];
  secondary_navigation: NavigationItemDto[];
  tertiary_navigation: NavigationItemDto[];
  socialmedia_navigation: NavigationItemDto[];
  hash?: string;
}

export const configApi = {
  getConfiguration: (params?: {
    [key: string]: unknown;
  }): Promise<AxiosResponse<GetConfigurationResponse | undefined>> =>
    axiosInstance({
      method: "GET",
      url: `/configuration`,
      params,
      transformResponse: (response): GetConfigurationResponse | undefined => {
        if (!response) {
          return;
        }

        try {
          const json = JSON.parse(response);
          return json as GetConfigurationResponse;
        } catch (e) {
          console.warn(e);
          throw new Error("Could not parse response");
        }
      },
    }),

  getMenues: (params?: {
    [key: string]: unknown;
  }): Promise<AxiosResponse<GetMenuesResponse | undefined>> =>
    axiosInstance({
      method: "GET",
      url: `/menues`,
      params,
      transformResponse: (response): GetMenuesResponse | undefined => {
        if (!response) {
          return;
        }

        try {
          const json = JSON.parse(response);
          return json as GetMenuesResponse;
        } catch (e) {
          console.warn(e);
          throw new Error("Could not parse response");
        }
      },
    }),
};
