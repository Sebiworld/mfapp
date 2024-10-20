import { DefaultPageDto } from "@models/page/default-page-dto.model";
import { ProjectDetailsDto, ProjectDto } from "@models/project-dto.model";
import axios, { AxiosResponse } from "axios";
// import apiSchema from './schema.json';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APIURL,
  headers: {
    "content-type": "application/json",
    "x-api-key": import.meta.env.VITE_APIKEY,
  },
});

export interface GetProjectsResponse {
  hash?: string;
  projects: { [key: number]: ProjectDto };
}

export const MFApi = {
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
          throw new Error("Could not parse response");
        }
      },
    }),

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
  getFile: (path: string, params?: { file: string; [key: string]: unknown }) =>
    axiosInstance({
      method: "GET",
      url: `/file${(path?.[0] !== "/" ? "/" : "") + path}`,
      params,
      transformResponse: (response): void => {
        console.log("RESPONSE", response);
      },
    }),
  getFileById: (
    id: number,
    params?: { file: string; [key: string]: unknown }
  ) =>
    axiosInstance({
      method: "GET",
      url: `/file/${id}`,
      params,
      transformResponse: (response): void => {
        console.log("RESPONSE", response);
      },
    }),
  getFileByIdUrl: (
    id: number,
    params: { file: string; [key: string]: unknown }
  ) =>
    `${axiosInstance.getUri({
      method: "GET",
      url: `/file/${id}`,
      params: { ...params, api_key: import.meta.env.VITE_APIKEY },
    })}`,
  // postData: () =>
  //   instance({
  //     'method': 'POST',
  //     'url': '/api',
  //     'data': {
  //       'item1': 'data1',
  //       'item2': 'item2'
  //     },
  //     'headers': {
  //       'content-type': 'application/json' // override instance defaults
  //     },
  //   })
  getErrorTest: (params?: { [key: string]: unknown }) =>
    axiosInstance({
      method: "GET",
      url: `/errorTest`,
      params,
      transformResponse: (response): ProjectDto => {
        try {
          const json = JSON.parse(response);
          return json as ProjectDto;
        } catch (e) {
          throw new Error("Could not parse response");
        }
      },
    }),
};
