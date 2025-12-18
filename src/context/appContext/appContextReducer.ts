import { MatomoTracker } from "@certible/use-matomo";

export interface AppContextState {
  matomoInstance: MatomoTracker | null;
}

export const AppContextInitialState: AppContextState = {
  matomoInstance: null,
};

export const AppContextActionTypes = {
  SET_MATOMO_INSTANCE: "SET_MATOMO_INSTANCE",
} as const;

export type AppContextAction = {
  type: typeof AppContextActionTypes.SET_MATOMO_INSTANCE;
  payload: MatomoTracker | null;
};

export const appContextReducer = (
  state: AppContextState,
  action: AppContextAction
): AppContextState => {
  if (action.type === AppContextActionTypes.SET_MATOMO_INSTANCE) {
    return {
      ...state,
      matomoInstance: action.payload,
    };
  }

  return state;
};
