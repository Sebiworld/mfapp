import { GlobalStore } from "../global.store";

import {
  orderBy as _orderBy,
  trimStart as _trimStart,
  startsWith as _startsWith,
} from "lodash";
import { isValidArray } from "@utils/functions/isValidArray";
import md5 from "blueimp-md5";

export const selectPage = (path: string) => (state: GlobalStore) =>
  state.pages[path];

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
