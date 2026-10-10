import { beforeEach, describe, expect, it } from "vitest";
import { useGlobalStore } from "../../global.store";
import { pageUnlocksStoreActions } from "../pageUnlocks.actions";
import { selectPageUnlockKey } from "../pageUnlocks.selectors";
import { pagesStoreActions } from "../../pages/pages.actions";
import { initializationStoreActions } from "../../initialization/initialization.actions";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";

const NOW = 1_800_000_000;

// Cast: only `isLoggedIn` is read.
type GlobalStoreUser = NonNullable<
  ReturnType<typeof useGlobalStore.getState>["user"]
>;

// Cast: only the fields read by the slice are set.
const buildPage = (overrides: Partial<PageDtoVariant> = {}): PageDtoVariant =>
  ({
    id: 7,
    name: "galerie",
    url: "/galerie/",
    title: "Galerie",
    template: { id: 1, name: "gallery", label: "Gallery" },
    ...overrides,
  }) as PageDtoVariant;

beforeEach(() => {
  useGlobalStore.setState({ pageUnlocks: {}, user: undefined });
  pagesStoreActions.resetSlice();
});

describe("pageUnlocks store", () => {
  it("keeps working with a persisted store from before the slice existed", async () => {
    // Drops the slice from memory first (this write is persisted too), then puts the old shape into storage.
    useGlobalStore.setState({
      pageUnlocks: undefined as unknown as Record<string, never>,
    });
    // Shape written by earlier app versions: no `pageUnlocks` at all.
    localStorage.setItem(
      "mfStore",
      JSON.stringify({
        state: {
          pages: {
            "/alt/": buildPage({ id: 3, url: "/alt/" }),
            "/neu/": buildPage({ id: 4, url: "/neu/", locked: false }),
          },
        },
        version: 0,
      })
    );

    await useGlobalStore.persist.rehydrate();

    // A copy without `locked` may hold content that is protected by now; it is not kept.
    expect(useGlobalStore.getState().pages["/alt/"]).toBeUndefined();
    expect(useGlobalStore.getState().pages["/neu/"]?.id).toBe(4);
    expect(selectPageUnlockKey(3)(useGlobalStore.getState())).toBe(undefined);

    pageUnlocksStoreActions.setPageUnlock(3, "k3", NOW + 60, "password");

    expect(selectPageUnlockKey(3)(useGlobalStore.getState())).toBe("k3");
    expect(localStorage.getItem("mfStore")).toContain('"pageUnlocks"');
  });

  it("keeps sending a key the device clock already holds for expired", () => {
    // A device clock running ahead must not drop a fresh key; the server decides.
    pageUnlocksStoreActions.setPageUnlock(7, "k7", NOW - 60, "password");
    pageUnlocksStoreActions.removeExpiredPageUnlocks(NOW);

    expect(selectPageUnlockKey(7)(useGlobalStore.getState())).toBe("k7");
  });

  it("drops expired keys and the cached content opened with them", () => {
    // Expired more than a day ago by the device clock.
    pageUnlocksStoreActions.setPageUnlock(7, "old", NOW - 90_000, "password");
    pageUnlocksStoreActions.setPageUnlock(8, "fresh", NOW + 100, "password");
    pagesStoreActions.addPage(
      "/galerie/",
      buildPage({ locked: false, unlock_key: "old", expires: NOW - 90_000 })
    );
    pagesStoreActions.addPage(
      "/andere/",
      buildPage({ id: 8, url: "/andere/", locked: false, expires: NOW + 100 })
    );

    pageUnlocksStoreActions.removeExpiredPageUnlocks(NOW);

    const state = useGlobalStore.getState();
    expect(state.pageUnlocks[7]).toBeUndefined();
    expect(state.pageUnlocks[8]?.key).toBe("fresh");
    expect(state.pages["/galerie/"]).toBeUndefined();
    expect(state.pages["/andere/"]?.id).toBe(8);
  });

  it("removes every key created while signed in on logout, but keeps guest ones", () => {
    pageUnlocksStoreActions.setPageUnlock(6, "guest", NOW + 100, "password");
    useGlobalStore.setState({
      user: { isLoggedIn: true } as GlobalStoreUser,
    });
    pageUnlocksStoreActions.setPageUnlock(7, "acc", NOW + 100, "account");
    pageUnlocksStoreActions.setPageUnlock(8, "pw", NOW + 100, "password");

    initializationStoreActions.resetApp();

    const state = useGlobalStore.getState();
    expect(state.pageUnlocks[6]?.key).toBe("guest");
    expect(state.pageUnlocks[7]).toBeUndefined();
    expect(state.pageUnlocks[8]).toBeUndefined();
  });
});
