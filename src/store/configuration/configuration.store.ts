import { StateCreator } from "zustand";
import { GlobalStore } from "../global.store";
import { GetMenuesResponse } from "@api/axios/configApi";
import { ConfigurationDto } from "@models/utility-types/configuration-dto.model";

export interface ConfigurationSlice {
  configurationParams?: ConfigurationDto;
  menues?: GetMenuesResponse;
  globalCss?: { [key: string]: string | number };
}

export const createConfigurationSlice: StateCreator<
  GlobalStore,
  [],
  [],
  ConfigurationSlice
> = () => ({
  configuration: undefined,
  menues: undefined,
  globalCss: undefined,
});
