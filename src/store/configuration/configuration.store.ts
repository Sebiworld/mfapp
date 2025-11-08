import { StateCreator } from "zustand";
import { GlobalStore } from "../global.store";
import { LoadingStatus } from "@models/loading-status.model";
import {
  GetConfigurationResponse,
  GetMenuesResponse,
} from "@api/axios/configApi";

export interface ConfigurationSlice {
  configuration: LoadingStatus<GetConfigurationResponse>;
  menues: LoadingStatus<GetMenuesResponse>;
}

export const createConfigurationSlice: StateCreator<
  GlobalStore,
  [],
  [],
  ConfigurationSlice
> = () => ({
  configuration: {
    status: "uninitialized",
  },
  menues: {
    status: "uninitialized",
  },


});


