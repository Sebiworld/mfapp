import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios";
import { isValidObject } from "@utils/functions/isValidObject";

export const fileApi = {
  getFile: (
    path: string,
    params?: { file: string; [key: string]: unknown }, // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    config?: AxiosRequestConfig<any>
  ) => {
    if (!isValidObject(config)) {
      return axiosInstance({
        method: "GET",
        url: `/file${(path?.[0] !== "/" ? "/" : "") + path}`,
        params,
      });
    }

    return axiosInstance({
      method: "GET",
      url: `/file${(path?.[0] !== "/" ? "/" : "") + path}`,
      params,
      ...config,
    });
  },

  getFileById: (
    id: number,
    params?: { file: string; [key: string]: unknown },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    config?: AxiosRequestConfig<any>
  ) => {
    if (!isValidObject(config)) {
      return axiosInstance({
        method: "GET",
        url: `/file/${id}`,
        params,
      });
    }

    return axiosInstance({
      method: "GET",
      url: `/file/${id}`,
      params,
      ...config,
    });
  },

  getFileByIdUrl: (
    id: number,
    params: { file: string; [key: string]: unknown }
  ) => {
    return `${axiosInstance.getUri({
      method: "GET",
      url: `/file/${id}`,
      params: { ...params, api_key: import.meta.env.VITE_APIKEY },
    })}`;
  },
};
