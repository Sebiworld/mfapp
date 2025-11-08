import { GlobalStore } from "../global.store";

export const selectConfigurationLoadingStatus = (state: GlobalStore) =>
  state.configuration;
export const selectConfiguration = (state: GlobalStore) =>
  state.configuration?.data;
export const selectMenuesLoadingStatus = (state: GlobalStore) => state.menues;
export const selectMenues = (state: GlobalStore) => state.menues?.data;
