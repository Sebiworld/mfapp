import { GlobalStore } from "../global.store";

export const selectConfigurationParams = (state: GlobalStore) =>
  state.configurationParams;
export const selectMenues = (state: GlobalStore) => state.menues;
