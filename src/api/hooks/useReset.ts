import { initializationStoreActions } from "@src/store/initialization/initialization.actions";

import { useCallback } from "react";
import { useConfigurationApi } from "./useConfigurationApi";
import { usePagesApi } from "./usePagesApi";
import { useProjectsApi } from "./useProjectsApi";
import { useProjectRolesApi } from "./useProjectRolesApi";

interface UseResetOutput {
  reset: (includeAuth?: boolean) => Promise<void>;
  reinitialize: () => Promise<void>;
}

export const useReset = (): UseResetOutput => {
  const { initialize: initializeConfiguration } = useConfigurationApi();
  const { initialize: initializePages } = usePagesApi();
  const { initialize: initializeProjects } = useProjectsApi();
  const { initialize: initializeProjectRoles } = useProjectRolesApi();

  /**
   * Initializes the app and its parts
   */
  const reinitialize = useCallback(async () => {
    await initializeConfiguration();
    await initializePages();
    await initializeProjects();
    await initializeProjectRoles();
  }, [
    initializeConfiguration,
    initializePages,
    initializeProjectRoles,
    initializeProjects,
  ]);

  /**
   * Resets the app (mainly after logout)
   */
  const reset = useCallback(
    async (includeAuth?: boolean) => {
      console.log("Resetting app...");
      // Reset everything:
      initializationStoreActions.resetApp(includeAuth);

      // Re-initialize:
      await reinitialize();
    },
    [reinitialize]
  );

  return {
    reset,
    reinitialize,
  };
};
