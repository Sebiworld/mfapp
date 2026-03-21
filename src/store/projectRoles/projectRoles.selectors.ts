import { GlobalStore } from "../global.store";

export const selectProjectRoles = (state: GlobalStore) => state.roles;
export const selectProjectCasts = (state: GlobalStore) => state.casts;
export const selectProjectSeasons = (state: GlobalStore) => state.seasons;
export const selectProjectPortraits = (state: GlobalStore) => state.portraits;
export const selectProjectRole = (id: number) => (state: GlobalStore) =>
  state.roles[id];
