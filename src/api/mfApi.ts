import { axiosInstance } from "./axios";
import { pageApi } from "./pageApi";
import { projectsApi } from "./projectsApi";
import { fileApi } from "./fileApi";
import { authApi } from "./authApi";

export const MFApi = {
  ...pageApi,
  ...projectsApi,
  ...fileApi,
  ...authApi,

  getErrorTest: (params?: { [key: string]: unknown }) =>
    axiosInstance({
      method: "GET",
      url: `/errorTest`,
      params,
      transformResponse: (response): unknown => {
        try {
          const json = JSON.parse(response);
          return json;
        } catch (e) {
          throw new Error("Could not parse response");
        }
      },
    }),
};
