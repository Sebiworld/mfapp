import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ImageDto } from "@models/image-dto.model";
import { ContentGalleryMasonry } from "../ContentGalleryMasonry";
import { FALLBACK_ASPECT_RATIO } from "../getImageAspectRatio";
import "@utils/i18n/i18n";

vi.mock("@components/lazyPicture/LazyPicture", () => ({
  LazyPicture: () => <span />,
}));

/**
 * Builds a gallery image.
 * @param basename File name of the image.
 * @param description Alt text stored with the image.
 * @returns The image as the API delivers it.
 */
const image = (basename: string, description: string): ImageDto =>
  ({
    basename,
    name: basename,
    description,
    page_id: 4711,
    ext: "jpg",
    width: 1200,
    height: 800,
    modified: 1,
    filesize: 2,
  }) as ImageDto;

describe("ContentGalleryMasonry", () => {
  it("gives every image button a name with its position, and the description when there is one", () => {
    render(
      <ContentGalleryMasonry
        images={[
          image("a.jpg", ""),
          image("b.jpg", "Probe im Saal"),
          image("c.jpg", ""),
        ]}
      />
    );

    expect(
      screen.getByRole("button", { name: "Bild 1 von 3 öffnen" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Bild 2 von 3 öffnen: Probe im Saal",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Bild 3 von 3 öffnen" })
    ).toBeInTheDocument();
  });

  it("reserves each image's space from its pixel size before it has loaded", () => {
    render(
      <ContentGalleryMasonry
        images={[
          image("a.jpg", ""),
          { ...image("b.jpg", ""), width: 723, height: 1080 },
        ]}
      />
    );

    expect(
      screen.getByRole("button", { name: "Bild 1 von 2 öffnen" })
    ).toHaveStyle({ aspectRatio: String(1200 / 800) });
    expect(
      screen.getByRole("button", { name: "Bild 2 von 2 öffnen" })
    ).toHaveStyle({ aspectRatio: String(723 / 1080) });
  });

  it("falls back to the delivered ratio, then to a fixed ratio, when the size is missing", () => {
    render(
      <ContentGalleryMasonry
        images={[
          {
            ...image("a.jpg", ""),
            width: 0,
            height: 0,
            dimension_ratio: 1.5,
          },
          {
            ...image("b.jpg", ""),
            width: undefined,
            height: undefined,
            dimension_ratio: undefined,
          } as unknown as ImageDto,
        ]}
      />
    );

    expect(
      screen.getByRole("button", { name: "Bild 1 von 2 öffnen" })
    ).toHaveStyle({ aspectRatio: "1.5" });
    expect(
      screen.getByRole("button", { name: "Bild 2 von 2 öffnen" })
    ).toHaveStyle({ aspectRatio: String(FALLBACK_ASPECT_RATIO) });
  });
});
