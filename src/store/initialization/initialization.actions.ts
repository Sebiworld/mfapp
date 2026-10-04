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

/**
 * Removes all data loaded for the current session and starts a new session version, so views holding such data
 * start over (see `sessionVersion`).
 * @param includeAuth `false` keeps tokens and user (login, where they already belong to the new session).
 */
const resetApp = (includeAuth?: boolean): void => {
  if (includeAuth !== false) {
    authStoreActions.resetSlice();
  }

  configurationStoreActions.resetSlice();
  pagesStoreActions.resetSlice();
  projectsStoreActions.resetSlice();
  projectRolesStoreActions.resetSlice();

  useGlobalStore.setState((state) => {
    state.sessionVersion = (state.sessionVersion ?? 0) + 1;
    return state;
  });
};

export const initializationStoreActions = {
  registerUninitializedPart,
  setPartInitialized,
  setDidReceiveWelcomeMessage,
  setAreCookiesAllowed,
  resetApp,
};
