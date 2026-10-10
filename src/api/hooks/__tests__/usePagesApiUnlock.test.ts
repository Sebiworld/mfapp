import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { AxiosResponse } from "axios";
import { usePagesApi } from "../usePagesApi";
import { MFApi } from "@api/axios/mfApi";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { useGlobalStore } from "@src/store/global.store";
import { pagesStoreActions } from "@src/store/pages/pages.actions";
import { pageUnlocksStoreActions } from "@src/store/pageUnlocks/pageUnlocks.actions";
import { nowInSeconds } from "@src/store/pageUnlocks/pageUnlocks.selectors";

vi.mock("@api/axios/mfApi", () => ({
  MFApi: {
    getPage: vi.fn(),
    getPageListItems: vi.fn(),
  },
}));

// The hook only reads status and data.
const mockResponse = <T>(status: number, data?: T): AxiosResponse<T> =>
  ({ status, data }) as AxiosResponse<T>;

const PATH = "/galerie/";

// Cast: only the fields the hook and the store read are set.
const lockedPage = {
  id: 7,
  name: "galerie",
  url: PATH,
  title: "Galerie",
  template: { id: 1, name: "gallery", label: "Gallery" },
  locked: true,
} as PageDtoVariant;

const openedPage = (key: string, expires: number): PageDtoVariant =>
  ({
    ...lockedPage,
    locked: false,
    unlock_key: key,
    expires,
    contents: [{ id: 1, type: "text", text: "Inhalt" }],
  }) as PageDtoVariant;

const load = async (): Promise<PageDtoVariant | true | Error> => {
  const { result } = renderHook(() => usePagesApi());
  return result.current.loadPage(PATH);
};

beforeEach(() => {
  useGlobalStore.setState({ pageUnlocks: {} });
  pagesStoreActions.resetSlice();
});

describe("usePagesApi: password protected pages", () => {
  it("sends the stored key of the cached page", async () => {
    const expires = nowInSeconds() + 3600;
    pagesStoreActions.addPage(PATH, lockedPage);
    pageUnlocksStoreActions.setPageUnlock(7, "k7", expires, "password");
    vi.mocked(MFApi.getPage).mockResolvedValue(
      mockResponse(200, openedPage("k7", expires))
    );

    await load();

    expect(MFApi.getPage).toHaveBeenCalledWith(PATH, { unlock: "k7" });
    expect(useGlobalStore.getState().pages[PATH]?.locked).toBe(false);
  });

  it("drops the key and replaces the cached content when the page stays locked", async () => {
    const expires = nowInSeconds() + 3600;
    pagesStoreActions.addPage(PATH, openedPage("k7", expires));
    pageUnlocksStoreActions.setPageUnlock(7, "k7", expires, "password");
    vi.mocked(MFApi.getPage).mockResolvedValue(mockResponse(200, lockedPage));

    await load();
    // A second load must not loop on the rejected key.
    await load();

    expect(MFApi.getPage).toHaveBeenCalledTimes(2);
    expect(vi.mocked(MFApi.getPage).mock.calls[1]).toEqual([PATH, undefined]);
    expect(useGlobalStore.getState().pageUnlocks[7]).toBeUndefined();
    const cached = useGlobalStore.getState().pages[PATH] as unknown as {
      locked?: boolean;
      contents?: unknown;
    };
    expect(cached.locked).toBe(true);
    expect(cached.contents).toBeUndefined();
  });

  it("asks once more with a kept key when the page was not cached", async () => {
    const expires = nowInSeconds() + 3600;
    pageUnlocksStoreActions.setPageUnlock(7, "k7", expires, "password");
    vi.mocked(MFApi.getPage)
      .mockResolvedValueOnce(mockResponse(200, lockedPage))
      .mockResolvedValueOnce(mockResponse(200, openedPage("k7", expires)));

    const output = await load();

    expect(vi.mocked(MFApi.getPage).mock.calls).toEqual([
      [PATH, undefined],
      [PATH, { unlock: "k7" }],
    ]);
    expect((output as PageDtoVariant).locked).toBe(false);
  });

  it("keeps a key delivered for the account", async () => {
    const expires = nowInSeconds() + 3600;
    vi.mocked(MFApi.getPage).mockResolvedValue(
      mockResponse(200, openedPage("acc", expires))
    );

    await load();

    expect(useGlobalStore.getState().pageUnlocks[7]).toEqual({
      key: "acc",
      expires,
      source: "account",
      signedIn: true,
    });
  });
});
