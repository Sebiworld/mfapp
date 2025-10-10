import { StateCreator } from "zustand";
import { GlobalStore } from "./global.store";
import { PageCardDto } from "@models/page/page-card-dto.model";
import { orderBy as _orderBy } from "lodash";

export interface PageCardsState {
  pageCards: { [key: string]: PageCardDto };
}

export interface PageCardsActions {
  addPageCards: (pageCards: PageCardDto[]) => void;
  initializePageCards: () => Promise<void>;
  resetPageCards: (projectId?: number, template?: string) => Promise<void>;
}

export type PageCardsSlice = PageCardsState & PageCardsActions;

export const createPageCardsSlice: StateCreator<
  GlobalStore,
  [],
  [],
  PageCardsSlice
> = (set, get) => ({
  pageCards: {},

  addPageCards: async (pageCards: PageCardDto[]) => {
    set((state) => {
      const changedState = {
        pageCards: { ...state.pageCards },
      };

      for (const pageCard of pageCards) {
        changedState.pageCards[pageCard.id] = pageCard;
      }

      return changedState;
    });
  },

  initializePageCards: async () => {
    const setPartInitialized = get().setPartInitialized;
    setPartInitialized("pagecards");
  },

  resetPageCards: async (projectId?: number, template?: string) => {
    if (!projectId && !template) {
      set((state) => {
        state.pageCards = {};
        return state;
      });
      return;
    }

    set((state) => {
      const changedState = {
        pageCards: {} as { [key: string]: PageCardDto },
      };

      for (const pageCardId in state.pageCards) {
        const pageCard = state.pageCards[pageCardId];

        // Filter out project specific page cards
        if (projectId && pageCard.project_id === projectId) {
          continue;
        }

        if (template && pageCard.template.name === template) {
          continue;
        }

        changedState.pageCards[pageCardId] = pageCard;
      }

      return changedState;
    });
  },
});

export const selectAddPageCards = (state: GlobalStore) => state.addPageCards;
export const selectResetPageCards = (state: GlobalStore) =>
  state.resetPageCards;

export const selectPageCards =
  (
    projectId?: number,
    template?: string,
    sortBy?: string[],
    sortByOrders?: ("asc" | "desc")[]
  ) =>
  (state: GlobalStore) => {
    const output = Object.values(state.pageCards).filter((pageCard) => {
      if (projectId && pageCard.project_id !== projectId) {
        return false;
      }

      if (template && pageCard.template.name !== template) {
        return false;
      }

      return true;
    });

    if (sortBy) {
      return _orderBy(output, sortBy, sortByOrders);
    }

    return _orderBy(output, ["datetime_from"], ["desc"]);
  };
export const selectArticles = (
  projectId?: number,
  sortBy?: string[],
  sortByOrders?: ("asc" | "desc")[]
) => selectPageCards(projectId, "article", sortBy, sortByOrders);
export const selectGalleries = (
  projectId?: number,
  sortBy?: string[],
  sortByOrders?: ("asc" | "desc")[]
) => selectPageCards(projectId, "gallery", sortBy, sortByOrders);
