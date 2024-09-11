import { StateCreator } from "zustand";
import { GlobalStore } from "./global.store";

export interface AuthSlice {
  user?: string;
  login: (username: string, password: string) => boolean;
  logout: () => boolean;
}

export const createAuthSlice: StateCreator<
  GlobalStore,
  [],
  [],
  AuthSlice
> = () => ({
  user: undefined,
  login: () => false,
  logout: () => false,
});
