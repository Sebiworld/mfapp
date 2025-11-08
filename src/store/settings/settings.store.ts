import { StateCreator } from "zustand";
import { GlobalStore } from "../global.store";

export interface SettingsSlice {
  globalCss?: { [key: string]: string | number };
}

export const createSettingsSlice: StateCreator<
  GlobalStore,
  [],
  [],
  SettingsSlice
> = () => ({
  globalCss: undefined,
});
