import { ProjectDetailsDto, ProjectDto } from "@models/project-dto.model";
import { AxiosResponse } from "axios";
import { axiosInstance } from "./axios";

export interface GetProjectsResponse {
  hash?: string;
  projects: { [key: number]: ProjectDto };
}

export const projectsApi = {
  getProjects: (params?: {
    [key: string]: unknown;
  }): Promise<AxiosResponse<GetProjectsResponse | undefined>> =>
    axiosInstance({
      method: "GET",
      url: `/projects`,
      params,
      transformResponse: (response): GetProjectsResponse | undefined => {
        if (!response) {
          return;
        }

        try {
          const json = JSON.parse(response);
          return json as GetProjectsResponse;
        } catch (e) {
          console.warn(e);
          throw new Error("Could not parse response");
        }
      },
    }),

  getProjectDetails: (
    id: number,
    params?: { [key: string]: unknown }
  ): Promise<AxiosResponse<ProjectDetailsDto | undefined>> =>
    axiosInstance({
      method: "GET",
      url: `/projects/${id}`,
      params,
      transformResponse: (response): ProjectDetailsDto | undefined => {
        if (!response) {
          return;
        }

        try {
          const json = JSON.parse(response);
          return json as ProjectDetailsDto;
        } catch (e) {
          console.warn(e);
          throw new Error("Could not parse response");
        }
      },
    }),
};
