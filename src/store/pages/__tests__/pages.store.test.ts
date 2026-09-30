import { beforeEach, describe, expect, it } from "vitest";
import { useGlobalStore } from "../../global.store";
import { pagesStoreActions } from "../pages.actions";
import { selectPage, selectPageCards } from "../pages.selectors";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { PageCardDtoWithIndex } from "../pages.store";

const buildPage = (id: number, path: string): PageDtoVariant =>
  ({
    id,
    name: path,
    language: "de",
    url: path,
    httpUrl: `https://example.test${path}`,
    template: { id: 1, name: "default", label: "Default" },
    created: 0,
    modified: 0,
    title: `Page ${id}`,
  } as PageDtoVariant);

const buildPageCard = (
  id: number,
  overrides: Partial<PageCardDtoWithIndex> = {}
): PageCardDtoWithIndex =>
  ({
    id,
    name: `card-${id}`,
    language: "de",
    url: `/card-${id}`,
    httpUrl: `https://example.test/card-${id}`,
    template: { id: 1, name: "article", label: "Article" },
    created: 0,
    modified: 0,
    title: `Card ${id}`,
    ...overrides,
  } as PageCardDtoWithIndex);

// Every test starts from a clean slice: zustand keeps its state in a module
// singleton, so without this reset a page added in one test would still be
// visible in the next one (in addition to the localStorage cleanup in the
// global test setup, which only covers the persisted copy).
beforeEach(() => {
  pagesStoreActions.resetSlice();
});

describe("pages store: selectPage + addPage", () => {
  it("returns undefined for a path that was never loaded", () => {
    expect(selectPage("/unknown")(useGlobalStore.getState())).toBeUndefined();
  });

  it("returns the page added via addPage for its path", () => {
    const page = buildPage(1, "/kurse");

    pagesStoreActions.addPage("/kurse", page);

    expect(selectPage("/kurse")(useGlobalStore.getState())).toEqual(page);
  });

  it("does not carry the previous test's page into a fresh test", () => {
    // The previous test added "/kurse"; the beforeEach reset above must have
    // cleared it before this test runs.
    expect(selectPage("/kurse")(useGlobalStore.getState())).toBeUndefined();
  });
});

describe("pages store: selectPageCards", () => {
  it("filters by projectId and orders by the requested sort key", () => {
    pagesStoreActions.addPageCards(
      [
        buildPageCard(1, { project_id: 1, datetime_from: 300 }),
        buildPageCard(3, { project_id: 2, datetime_from: 200 }),
        buildPageCard(2, { project_id: 1, datetime_from: 100 }),
      ],
      { indexKey: "1", filterHash: "hash", startIndex: 0 }
    );

    const result = selectPageCards({ projectId: 1, sortBy: ["datetime_from"] })(
      useGlobalStore.getState()
    );

    // Ascending by datetime_from, which is the reverse of both id and insertion order.
    expect(result.map((card) => card.id)).toEqual([2, 1]);
  });

  it("removes all page cards again after resetSlice", () => {
    pagesStoreActions.addPageCards(
      [buildPageCard(9, { project_id: 1, datetime_from: 100 })],
      { indexKey: "1", filterHash: "hash", startIndex: 0 }
    );

    pagesStoreActions.resetSlice();

    expect(
      selectPageCards({ projectId: 1 })(useGlobalStore.getState())
    ).toEqual([]);
  });
});
