import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { StateCreator } from "zustand";
import { GlobalStore } from "../global.store";
import { LoadingStatus } from "@models/loading-status.model";

export interface PagesSlice {
  pages: { [key: string]: LoadingStatus<PageDtoVariant> };
}

export const createPagesSlice: StateCreator<
  GlobalStore,
  [],
  [],
  PagesSlice
> = () => ({
  pages: {},
});
