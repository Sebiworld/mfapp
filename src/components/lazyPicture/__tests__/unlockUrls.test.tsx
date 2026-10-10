import { describe, expect, it } from "vitest";
import { render as baseRender } from "@testing-library/react";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { ImageDto } from "@models/image-dto.model";
import { getImageFileUrl } from "../getImageFileUrl";
import { LazyPicture } from "../LazyPicture";
import { getGalleryItemsFromImages } from "@components/lightGallery/getGalleryItemsFromImages";
import { PageUnlockContext } from "@src/context/pageUnlock/PageUnlockContext";

// Cast: only the fields read by the URL builders are set.
const image = {
  page_id: 12,
  basename: "poster.jpg",
  ext: "jpg",
  modified: 1700000000,
  filesize: 4096,
  width: 2000,
  height: 1000,
} as ImageDto;

const unlockOf = (url: string): string | null =>
  new URL(url, "http://localhost").searchParams.get("unlock");

describe("file URLs of password protected pages", () => {
  it("adds the key to an image URL", () => {
    expect(unlockOf(getImageFileUrl(image, { width: 600 }, "k12"))).toBe("k12");
  });

  it("leaves URLs without a key unchanged", () => {
    expect(getImageFileUrl(image, { width: 600 }, undefined)).toBe(
      getImageFileUrl(image, { width: 600 })
    );
    expect(unlockOf(getImageFileUrl(image))).toBeNull();
  });

  it("adds the key to every lightbox URL", () => {
    const [item] = getGalleryItemsFromImages([image], "k12") ?? [];

    expect(unlockOf(item.src as string)).toBe("k12");
    expect(unlockOf(item.thumb as string)).toBe("k12");
    for (const source of item.sources ?? []) {
      for (const candidate of source.srcset.split(",")) {
        expect(unlockOf(candidate.trim().split(" ")[0])).toBe("k12");
      }
    }
  });

  it("renders the key into img and source URLs inside an opened page", () => {
    const { container } = baseRender(
      <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
        <PageUnlockContext.Provider value="k12">
          <LazyPicture image={image} sizes={[{ width: 600 }]} />
        </PageUnlockContext.Provider>
      </ThemeProvider>
    );

    const img = container.querySelector("img");
    expect(unlockOf(img?.getAttribute("src") ?? "")).toBe("k12");

    const sources = Array.from(container.querySelectorAll("source"));
    expect(sources.length).toBeGreaterThan(0);
    for (const source of sources) {
      const first = (source.getAttribute("srcset") ?? "").split(" ")[0];
      expect(unlockOf(first)).toBe("k12");
    }
  });
});
