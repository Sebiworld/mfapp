import { GlobalStore } from "../global.store";

export const selectPage = (path: string) => (state: GlobalStore) =>
  state.pages[path];
