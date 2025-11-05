import { StateCreator } from "zustand";
import { GlobalStore } from "./global.store";
import { PageCardDto } from "@models/page/page-card-dto.model";
import {
  orderBy as _orderBy,
  trimStart as _trimStart,
  startsWith as _startsWith,
  cloneDeep as _cloneDeep,
} from "lodash";
import { isValidObject } from "@utils/functions/isValidObject";
import { isValidArray } from "@utils/functions/isValidArray";
import md5 from "blueimp-md5";

export interface PageCardDtoWithIndex extends PageCardDto {
  indexData?: { [key: string]: { [key: string]: number } }; // key is projectId or 'global'. Inner key is the sort order
}

export interface PageCardsState {
  pageCards: { [key: string]: PageCardDtoWithIndex };
}

export interface PageCardsActions {
  addPageCards: (
    pageCards: PageCardDtoWithIndex[],
    indexData: { indexKey: string; filterHash: string; startIndex: number }
  ) => void;
  initializePageCards: () => Promise<void>;
  resetPageCards: (projectId?: number, template?: string) => Promise<void>;
}

export type PageCardsSlice = PageCardsState & PageCardsActions;

export const getFilterHash = (templates?: string[], sortBy?: string[]) => {
  const sortOrderKey = isValidArray(sortBy)
    ? sortBy.join(",")
    : "-datetime_from";

  const filterHash = md5(
    JSON.stringify({
      templates: templates,
      sortOrderKey,
    })
  );
  return filterHash;
};

export const createPageCardsSlice: StateCreator<
  GlobalStore,
  [],
  [],
  PageCardsSlice
> = (set, get) => ({
  pageCards: {},

  addPageCards: async (
    pageCards: PageCardDtoWithIndex[],
    indexData: { indexKey: string; filterHash: string; startIndex: number }
  ) => {
    // .map((item, index) => ({
    //   ...item,
    //   indexData: {
    //     [indexKey]: {
    //       [filterHash]: (params?.offset || 0) + index,
    //     },
    //   },
    // }))

    set((state) => {
      const changedState = {
        pageCards: _cloneDeep(state.pageCards),
      };

      for (const pageCardIndex in pageCards) {
        const pageCard = pageCards[pageCardIndex];

        const existingIndexData =
          changedState.pageCards[pageCard.id]?.indexData || {};

        changedState.pageCards[pageCard.id] = pageCard;

        // Merge index data if available
        if (isValidObject(indexData)) {
          const newIndex = indexData!.startIndex + parseInt(pageCardIndex, 10);
          const newIndexData = {
            [indexData!.indexKey]: {
              [indexData!.filterHash]: newIndex,
            },
          };

          // Remove matching indexData from other entries
          for (const otherPageCard of Object.values(changedState.pageCards)) {
            if (otherPageCard.id === pageCard.id) {
              continue;
            }

            if (
              otherPageCard.indexData?.[indexData!.indexKey]?.[
                indexData!.filterHash
              ] === newIndex
            ) {
              delete otherPageCard.indexData[indexData.indexKey][
                indexData.filterHash
              ];
            }
          }

          if (isValidObject(existingIndexData)) {
            changedState.pageCards[pageCard.id].indexData = {
              ...existingIndexData,
              ...newIndexData,
            };
          } else {
            changedState.pageCards[pageCard.id].indexData = newIndexData;
          }
        }
      }

      // Cleanup orphaned indexData entries
      for (const pageCardKey in changedState.pageCards) {
        const pageCard = changedState.pageCards[pageCardKey];

        if (!isValidObject(pageCard.indexData)) {
          continue;
        }

        const thisIndexData = pageCard.indexData;
        if (!isValidObject(thisIndexData)) {
          delete changedState.pageCards[pageCardKey];
          continue;
        }

        for (const indexDataKey in thisIndexData) {
          if (!isValidObject(thisIndexData[indexDataKey])) {
            continue;
          }

          if (!Object.keys(thisIndexData[indexDataKey]).length) {
            delete thisIndexData[indexDataKey];
            continue;
          }
        }

        if (Object.keys(thisIndexData).length === 0) {
          delete changedState.pageCards[pageCardKey];
          continue;
        }
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
        pageCards: {} as { [key: string]: PageCardDtoWithIndex },
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
  (params: {
    offset?: number;
    limit?: number;
    projectId?: number;
    templates?: string[];
    sortBy?: string[];
  }) =>
  (state: GlobalStore) => {
    const startIndex = params?.offset || 0;
    const endIndex =
      params?.limit && typeof params.limit === "number" && params.limit > 0
        ? startIndex + params.limit
        : startIndex + 12;
    const indexKey = params?.projectId ? `${params.projectId}` : "global";
    const filterHash = getFilterHash(params?.templates, params?.sortBy);

    const output = Object.values(state.pageCards).filter((pageCard) => {
      if (params?.projectId && pageCard.project_id !== params?.projectId) {
        return false;
      }

      if (
        isValidArray(params?.templates) &&
        !params?.templates.includes(pageCard.template.name)
      ) {
        return false;
      }

      if (params?.offset !== undefined || params?.limit !== undefined) {
        const pageCardIndex = pageCard.indexData?.[indexKey]?.[filterHash];
        if (pageCardIndex === undefined) {
          return false;
        }

        if (pageCardIndex < startIndex || pageCardIndex >= endIndex) {
          return false;
        }
      }

      return true;
    });

    if (isValidArray(params?.sortBy)) {
      const sortKeys = params.sortBy.map((key) => _trimStart(key, "-"));
      const sortOrders = params.sortBy.map((key) =>
        _startsWith(key, "-") ? "desc" : "asc"
      );

      return _orderBy(output, sortKeys, sortOrders);
    }

    return _orderBy(output, ["datetime_from"], ["desc"]);
  };
