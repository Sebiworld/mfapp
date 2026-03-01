import { useGlobalStore } from "../global.store";
import { UserDto } from "@models/user-dto.model";

const setNickname = (nickname?: string) => {
  useGlobalStore.setState({
    nickname,
  });
};

const setUser = (user: UserDto | undefined) => {
  useGlobalStore.setState({
    user,
  });
};

const setRefreshToken = (refreshToken: string) => {
  console.log("Setting refresh token:", { refreshToken });
  useGlobalStore.setState({
    refreshToken,
  });
};

const setAccessToken = (accessToken: string, refreshToken: string) => {
  useGlobalStore.setState({
    accessToken,
    refreshToken,
  });
};

const resetSlice = () => {
  useGlobalStore.setState((state) => {
    state.accessToken = undefined;
    state.refreshToken = undefined;
    state.user = undefined;
    return state;
  });
};

export const authStoreActions = {
  setNickname,
  setUser,
  setRefreshToken,
  setAccessToken,
  resetSlice,
};
