import { describe, expect, it } from "vitest";
import { ImageDto } from "@models/image-dto.model";
import { getImageFileUrl, getImageVersion } from "../getImageFileUrl";

// Cast: only the fields read by the URL builder are set.
const makeImage = (overrides: Partial<ImageDto> = {}): ImageDto =>
  ({
    page_id: 12,
    basename: "poster.jpg",
    modified: 1700000000,
    filesize: 4096,
    width: 2000,
    height: 1000,
    ...overrides,
  }) as ImageDto;

const versionOf = (url: string): string | null =>
  new URL(url, "http://localhost").searchParams.get("v");

describe("getImageFileUrl", () => {
  it("appends the version as modified and filesize", () => {
    expect(versionOf(getImageFileUrl(makeImage()))).toBe("1700000000.4096");
  });

  it("changes the URL when the modification time changes", () => {
    const a = getImageFileUrl(makeImage());
    const b = getImageFileUrl(makeImage({ modified: 1700000001 }));

    expect(a).not.toBe(b);
  });

  it("changes the URL when the file size changes", () => {
    const a = getImageFileUrl(makeImage());
    const b = getImageFileUrl(makeImage({ filesize: 4097 }));

    expect(a).not.toBe(b);
  });

  it("appends no version when a field is missing", () => {
    const withoutModified = makeImage({ modified: undefined });
    const withoutFilesize = makeImage({ filesize: undefined });

    expect(getImageVersion(withoutModified)).toBeUndefined();
    expect(versionOf(getImageFileUrl(withoutModified))).toBeNull();
    expect(versionOf(getImageFileUrl(withoutFilesize))).toBeNull();
  });

  it("keeps a filesize of zero as a present field", () => {
    expect(getImageVersion(makeImage({ filesize: 0 }))).toBe("1700000000.0");
  });

  it("keeps file and variant parameters", () => {
    const url = new URL(
      getImageFileUrl(makeImage(), { width: 800, webp: true }),
      "http://localhost"
    );

    expect(url.pathname.endsWith("/file/12")).toBe(true);
    expect(url.searchParams.get("file")).toBe("poster.jpg");
    expect(url.searchParams.get("width")).toBe("800");
    expect(url.searchParams.get("webp")).toBe("true");
  });
});
