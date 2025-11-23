import { pagesStoreActions } from "@src/store/pages/pages.actions";
import { projectsStoreActions } from "@src/store/projects/projects.actions";
import { useConfigurationApi } from "./useConfigurationApi";

interface UseInitializationOutput {
  initialize: () => Promise<void>;
  reset: () => Promise<void>;
}

export const useInitialization = (): UseInitializationOutput => {
  const { initializeConfiguration } = useConfigurationApi();

  const initialize = async () => {
    await initializeConfiguration();
    await pagesStoreActions.initializePages();
    await projectsStoreActions.initializeProjects();
  };

  const reset = async () => {};

  return {
    initialize,
    reset,
  };
};
