import { axiosInstance } from "./axios";
import { pageApi } from "./pageApi";
import { projectsApi } from "./projectsApi";
import { fileApi } from "./fileApi";
import { authApi } from "./authApi";
import { configApi } from "./configApi";
import { projectRolesApi } from "./projectRolesApi";
import { pageListApi } from "./pageListApi";

export const MFApi = {
  ...pageApi,
  ...pageListApi,
  ...projectsApi,
  ...projectRolesApi,
  ...fileApi,
  ...authApi,
  ...configApi,

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
          console.warn(e);
          throw new Error("Could not parse response");
        }
      },
    }),
};
