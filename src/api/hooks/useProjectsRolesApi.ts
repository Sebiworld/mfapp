import { MFApi } from "@api/axios/mfApi";
import { GetProjectRolesResponse } from "@api/axios/projectRolesApi";
import { useGlobalStore } from "@src/store/global.store";
import { initializationStoreActions } from "@src/store/initialization/initialization.actions";
import { projectRolesStoreActions } from "@src/store/projectRoles/projectRoles.actions";
import { isValidObject } from "@utils/functions/isValidObject";
import { useCallback } from "react";

interface UseProjectRolesApiOutput {
  loadProjectRoles: (
    id: number
  ) => Promise<GetProjectRolesResponse | true | Error>;
  initialize: () => Promise<void>;
}

export const useProjectRolesApi = (): UseProjectRolesApiOutput => {
  const loadProjectRoles = useCallback(
    async (id: number): Promise<GetProjectRolesResponse | true | Error> => {
      try {
        const params: { [key: string]: unknown } = {};
        const hash = useGlobalStore.getState().roles?.[id]?.hash;
        if (hash) {
          params.hash = hash;
        }

        const response = await MFApi.getProjectRoles(id, params);

        if (response.status === 204) {
          return true;
        }

        const responseData = response.data;

        if (!isValidObject(responseData?.roles)) {
          throw new Error("Invalid roles data received");
        }

        projectRolesStoreActions.setProjectRoles(id, responseData);

        return responseData ?? true;
      } catch (error) {
        console.error("Error in data fetch:", error);
        return error as Error;
      }
    },
    []
  );

  const initialize = useCallback(async () => {
    initializationStoreActions.setPartInitialized("projectRoles");
  }, []);

  return { loadProjectRoles, initialize };
};
