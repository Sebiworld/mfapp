import { authStoreActions } from "../auth/auth.actions";
import { configurationStoreActions } from "../configuration/configuration.actions";
import { useGlobalStore } from "../global.store";
import { pagesStoreActions } from "../pages/pages.actions";
import { projectsStoreActions } from "../projects/projects.actions";

const registerUninitializedPart = (key: string) =>
  useGlobalStore.setState((state) => {
    if (typeof state.intializedParts !== "object") {
      state.intializedParts = {};
    }
    state.intializedParts[key] = false;
    return state;
  });

const setPartInitialized = (key: string) =>
  useGlobalStore.setState((state) => {
    if (typeof state.intializedParts !== "object") {
      state.intializedParts = {};
    }
    state.intializedParts[key] = true;
    return state;
  });

const setDidReceiveWelcomeMessage = (value: boolean) => {
  useGlobalStore.setState((state) => {
    state.didReceiveWelcomeMessage = value;
    return state;
  });
};

const setAreCookiesAllowed = (value: boolean | null) => {
  useGlobalStore.setState((state) => {
    state.areCookiesAllowed = value;
    return state;
  });
};

const resetApp = async (includeAuth?: boolean) => {
  if (includeAuth !== false) {
    await authStoreActions.resetAuth();
  }

  await configurationStoreActions.resetConfiguration();
  await pagesStoreActions.resetPages();
  await projectsStoreActions.resetProjects();

  // TODO reset other stores
};

export const initializationStoreActions = {
  registerUninitializedPart,
  setPartInitialized,
  setDidReceiveWelcomeMessage,
  setAreCookiesAllowed,
  resetApp,
};
