import { useConfigurationApi } from "./useConfigurationApi";
import { initializationStoreActions } from "@src/store/initialization/initialization.actions";
import { usePagesApi } from "./usePagesApi";
import { useProjectsApi } from "./useProjectsApi";
import { useProjectRolesApi } from "./useProjectsRolesApi";
import { useAuthApi } from "./useAuthApi";
import { useCallback } from "react";

interface UseInitializationOutput {
  initialize: () => Promise<void>;
  reset: (includeAuth?: boolean) => Promise<void>;
}

export const useInitialization = (): UseInitializationOutput => {
  const { initialize: initializeConfiguration } = useConfigurationApi();
  const { initialize: initializeAuth } = useAuthApi();
  const { initialize: initializePages } = usePagesApi();
  const { initialize: initializeProjects } = useProjectsApi();
  const { initialize: initializeProjectRoles } = useProjectRolesApi();

  /**
   * Initializes the app and its parts
   */
  const initialize = useCallback(async () => {
    await initializeConfiguration();
    await initializeAuth();
    await initializePages();
    await initializeProjects();
    await initializeProjectRoles();
  }, [
    initializeAuth,
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
      // Reset everything:
      initializationStoreActions.resetApp(includeAuth);

      // Re-initialize:
      await initialize();
    },
    [initialize]
  );

  return {
    initialize,
    reset,
  };
};
