import { StateCreator } from "zustand";
import { GlobalStore } from "../global.store";
import { PageCardDto } from "@models/page/page-card-dto.model";

export interface PageCardDtoWithIndex extends PageCardDto {
  indexData?: { [key: string]: { [key: string]: number } }; // key is projectId or 'global'. Inner key is the sort order
}

export interface PageCardsSlice {
  pageCards: { [key: string]: PageCardDtoWithIndex };
}

export const createPageCardsSlice: StateCreator<
  GlobalStore,
  [],
  [],
  PageCardsSlice
> = () => ({
  pageCards: {},
});
