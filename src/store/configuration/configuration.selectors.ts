import { GlobalStore } from "../global.store";

export const selectConfigurationParams = (state: GlobalStore) =>
  state.configurationParams;
export const selectIsMaintenanceModeActive = (state: GlobalStore) =>
  !!selectConfigurationParams(state)?.maintenance_mode;
export const selectIsLoginActivated = (state: GlobalStore) =>
  !!selectConfigurationParams(state)?.activate_login;
export const selectIsRegistrationActivated = (state: GlobalStore) =>
  !!selectConfigurationParams(state)?.activate_registration;

export const selectMenues = (state: GlobalStore) => state.menues;

export const selectGlobalCss = (state: GlobalStore) => state.globalCss;
