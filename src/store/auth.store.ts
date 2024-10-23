import { StateCreator } from "zustand";
import { GlobalStore } from "./global.store";

export type StartupStep = "startup" | "nickname" | "login" | "registration";

export interface AuthSlice {
  user?: string;

  nickname?: string;
  setNickname: (nickname?: string) => void;

  startupStep?: StartupStep;
  setStartupStep: (step?: StartupStep) => void;

  login: (username: string, password: string) => boolean;
  logout: () => boolean;
}

export const createAuthSlice: StateCreator<GlobalStore, [], [], AuthSlice> = (
  set
) => ({
  user: undefined,

  nickname: undefined,
  setNickname: (nickname?: string) => {
    set((state) => {
      state.nickname = nickname;
      return state;
    });
  },

  startupStep: undefined,
  setStartupStep: (step?: StartupStep) => {
    set((state) => {
      state.startupStep = step;
      return state;
    });
  },

  login: () => false,
  logout: () => false,
});

export const selectUser = (state: GlobalStore) => state.user;

export const selectNickname = (state: GlobalStore) => state.nickname;
export const selectSetNickname = (state: GlobalStore) => state.setNickname;

export const selectStartupStep = (state: GlobalStore) => state.startupStep;
export const selectSetStartupStep = (state: GlobalStore) =>
  state.setStartupStep;

export const selectLogin = (state: GlobalStore) => state.login;
export const selectLogout = (state: GlobalStore) => state.logout;
