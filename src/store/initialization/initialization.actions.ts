import { authStoreActions } from "../auth/auth.actions";
import { configurationStoreActions } from "../configuration/configuration.actions";
import { useGlobalStore } from "../global.store";
import { pagesStoreActions } from "../pages/pages.actions";
import { projectRolesStoreActions } from "../projectRoles/projectRoles.actions";
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

const resetApp = (includeAuth?: boolean) => {
  if (includeAuth !== false) {
    authStoreActions.resetSlice();
  }

  configurationStoreActions.resetSlice();
  pagesStoreActions.resetSlice();
  projectsStoreActions.resetSlice();
  projectRolesStoreActions.resetSlice();
};

export const initializationStoreActions = {
  registerUninitializedPart,
  setPartInitialized,
  setDidReceiveWelcomeMessage,
  setAreCookiesAllowed,
  resetApp,
};
