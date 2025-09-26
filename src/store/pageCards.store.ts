import { StateCreator } from "zustand";
import { GlobalStore } from "./global.store";
import { PageCardDto } from "@models/page/page-card-dto.model";

export interface PageCardsState {
  pageCards: { [key: string]: PageCardDto };
}

export interface PageCardsActions {
  setPageCards: (pageCards: PageCardDto[]) => void;
  initializePageCards: () => Promise<void>;
  resetPageCards: () => Promise<void>;
}

export type PageCardsSlice = PageCardsState & PageCardsActions;

export const createPageCardsSlice: StateCreator<
  GlobalStore,
  [],
  [],
  PageCardsSlice
> = (set, get) => ({
  pageCards: {},

  setPageCards: async (pageCards: PageCardDto[]) => {
    set((state) => {
      const changedState = {
        pageCards: { ...state.pageCards },
      };

      for (const pageCard of pageCards) {
        changedState.pageCards[pageCard.id] = pageCard;
      }

      return changedState;
    });

    const initializePageCards = get().initializePageCards;
    await initializePageCards();
  },

  initializePageCards: async () => {
    const setPartInitialized = get().setPartInitialized;
    setPartInitialized("pagecards");
  },

  resetPageCards: async () => {
    set((state) => {
      state.pageCards = {};
      return state;
    });

    const initializePageCards = get().initializePageCards;
    await initializePageCards();
  },
});

export const selectSetPageCards = (state: GlobalStore) => state.setPageCards;

export const selectPageCards =
  (projectId?: number, template?: string) => (state: GlobalStore) =>
    Object.values(state.pageCards).filter((pageCard) => {
      if (projectId && pageCard.project_id !== projectId) {
        return false;
      }

      if (template && pageCard.template.name !== template) {
        return false;
      }

      return true;
    });
export const selectArticles = (projectId?: number) =>
  selectPageCards(projectId, "article");
export const selectGalleries = (projectId?: number) =>
  selectPageCards(projectId, "gallery");
