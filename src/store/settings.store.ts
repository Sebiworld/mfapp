import { StateCreator } from "zustand";
import { GlobalStore } from "./global.store";

export interface SettingsState {
  globalCss?: { [key: string]: string | number };
}

export interface SettingsActions {
  setGlobalCss: (vars: { [key: string]: string | number }) => void;
  resetGlobalCss: () => void;
}

export type SettingsSlice = SettingsState & SettingsActions;

export const createSettingsSlice: StateCreator<
  GlobalStore,
  [],
  [],
  SettingsSlice
> = (set) => ({
  globalCss: undefined,
  setGlobalCss: (vars: { [key: string]: string | number }) =>
    set((state) => {
      state.globalCss = vars;
      return state;
    }),
  resetGlobalCss: () =>
    set((state) => {
      state.globalCss = undefined;
      return state;
    }),
});

export const selectGlobalCss = (state: GlobalStore) => state.globalCss;
export const selectSetGlobalCss = (state: GlobalStore) => state.setGlobalCss;
export const selectResetGlobalCss = (state: GlobalStore) =>
  state.resetGlobalCss;
