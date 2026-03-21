import { GlobalStore } from "../global.store";

export const selectIsPartInitialized = (key: string) => (state: GlobalStore) =>
  state.intializedParts?.[key];
export const selectIsInitialized = (state: GlobalStore) =>
  state.intializedParts &&
  Object.values(state.intializedParts).every((value) => value);
export const selectDidReceiveWelcomeMessage = (state: GlobalStore) =>
  state.didReceiveWelcomeMessage;
export const selectAreCookiesAllowed = (state: GlobalStore) =>
  state.areCookiesAllowed;