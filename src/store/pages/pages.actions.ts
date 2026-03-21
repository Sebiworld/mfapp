import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { useGlobalStore } from "../global.store";
import { PageCardDtoWithIndex } from "./pages.store";
import { isValidObject } from "@utils/functions/isValidObject";
import { cloneDeep as _cloneDeep } from "lodash";

const addPage = (path: string, page: PageDtoVariant) => {
  useGlobalStore.setState((state) => {
    const stateChanges = {
      pages: { ...state.pages, [path]: page },
    };

    return stateChanges;
  });
};

const addPageCards = (
  pageCards: PageCardDtoWithIndex[],
  indexData: { indexKey: string; filterHash: string; startIndex: number }
) => {
  useGlobalStore.setState((state) => {
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
};

const resetPageCards = (projectId?: number, template?: string) => {
  if (!projectId && !template) {
    useGlobalStore.setState((state) => {
      state.pageCards = {};
      return state;
    });
    return;
  }

  useGlobalStore.setState((state) => {
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
};

const resetSlice = () => {
  useGlobalStore.setState((state) => {
    state.pages = {};
    state.pageCards = {};

    return state;
  });
};

export const pagesStoreActions = {
  addPage,
  addPageCards,
  resetPageCards,
  resetSlice,
};
