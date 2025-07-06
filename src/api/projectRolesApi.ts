import { AxiosResponse } from "axios";
import { axiosInstance } from "./axios";
import { ProjectRoleDto } from "@models/project-role/project-role-dto.model";
import { ProjectSeasonDto } from "@models/project-role/project-season-dto.model";
import { ProjectCastDto } from "@models/project-role/project-cast-dto.model";
import { ProjectPortraitDto } from "@models/project-role/project-portrait-dto.model";

export interface GetProjectRolesResponse {
  hash?: string;
  roles: { [key: number]: ProjectRoleDto };
  seasons?: { [key: number]: ProjectSeasonDto };
  casts?: { [key: number]: ProjectCastDto };
  portraits?: { [key: number]: ProjectPortraitDto };
}

export interface GetProjectPortraitsResponse {
  hash?: string;
  portraits: { [key: number]: ProjectPortraitDto };
}

export const projectRolesApi = {
  getProjectRoles: (
    id?: number,
    params?: { [key: string]: unknown }
  ): Promise<AxiosResponse<GetProjectRolesResponse | undefined>> =>
    axiosInstance({
      method: "GET",
      url: `/project-roles/${id}`,
      params,
      transformResponse: (response): GetProjectRolesResponse | undefined => {
        if (!response) {
          return;
        }

        try {
          const json = JSON.parse(response);
          return json as GetProjectRolesResponse;
        } catch (e) {
          throw new Error("Could not parse response");
        }
      },
    }),

  getProjectPortraits: (
    ids?: number[],
    params?: { [key: string]: unknown }
  ): Promise<AxiosResponse<GetProjectPortraitsResponse | undefined>> => {
    const requestParams = params || {};
    if (ids && ids.length > 0) {
      requestParams.ids = ids;
    }

    return axiosInstance({
      method: "GET",
      url: `/project-portraits`,
      params,
      transformResponse: (
        response
      ): GetProjectPortraitsResponse | undefined => {
        if (!response) {
          return;
        }

        try {
          const json = JSON.parse(response);
          return json as GetProjectPortraitsResponse;
        } catch (e) {
          throw new Error("Could not parse response");
        }
      },
    });
  },
};
