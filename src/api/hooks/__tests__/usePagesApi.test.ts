import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { AxiosResponse } from "axios";
import { usePagesApi } from "../usePagesApi";
import { MFApi } from "@api/axios/mfApi";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";

vi.mock("@api/axios/mfApi", () => ({
  MFApi: {
    getPage: vi.fn(),
    getPageListItems: vi.fn(),
  },
}));

// The hook branches on response.status/response.data rather than the full
// AxiosResponse shape, so the mocked responses only need those two fields.
const mockResponse = <T,>(status: number, data?: T): AxiosResponse<T> =>
  ({ status, data } as AxiosResponse<T>);

const page: PageDtoVariant = {
  id: 1,
  name: "kurse",
  language: "de",
  url: "/kurse",
  httpUrl: "https://example.test/kurse",
  template: { id: 1, name: "default", label: "Default" },
  created: 0,
  modified: 0,
  title: "Kurse",
} as PageDtoVariant;

describe("usePagesApi: loadPage", () => {
  it("returns the response data for a successful request", async () => {
    vi.mocked(MFApi.getPage).mockResolvedValue(mockResponse(200, page));

    const { result } = renderHook(() => usePagesApi());
    const output = await result.current.loadPage("/kurse");

    expect(output).toEqual(page);
  });

  it("returns true for a 204 (page unchanged)", async () => {
    vi.mocked(MFApi.getPage).mockResolvedValue(
      mockResponse<PageDtoVariant | undefined>(204, undefined)
    );

    const { result } = renderHook(() => usePagesApi());
    const output = await result.current.loadPage("/kurse");

    expect(output).toBe(true);
  });

  it("returns the Error instead of throwing when the request rejects", async () => {
    const error = new Error("network down");
    vi.mocked(MFApi.getPage).mockRejectedValue(error);

    const { result } = renderHook(() => usePagesApi());
    const output = await result.current.loadPage("/kurse");

    expect(output).toBe(error);
  });
});
