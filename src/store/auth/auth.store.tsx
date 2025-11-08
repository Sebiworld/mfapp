import { StateCreator } from "zustand";
import { GlobalStore } from "../global.store";
import { LoadingStatus } from "@models/loading-status.model";
import { UserDto } from "@models/user-dto.model";

export interface AuthSlice {
  nickname?: string;

  refreshToken?: string;
  accessToken?: string;

  user?: LoadingStatus<UserDto>;
}

export const createAuthSlice: StateCreator<
  GlobalStore,
  [],
  [],
  AuthSlice
> = () => ({
  nickname: undefined,

  refreshToken: undefined,
  accessToken: undefined,

  user: undefined,
});
