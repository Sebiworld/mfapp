import { GlobalStore } from "../global.store";

export const selectConfigurationParams = (state: GlobalStore) =>
  state.configurationParams;
export const selectIsMaintenanceModeActive = (state: GlobalStore) =>
  !!selectConfigurationParams(state)?.maintenance_mode;

export const selectMenues = (state: GlobalStore) => state.menues;
