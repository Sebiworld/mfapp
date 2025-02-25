import { axiosInstance } from "./axios";

export const fileApi = {
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
};
