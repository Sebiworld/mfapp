import { StrictMode } from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ImageDto } from "@models/image-dto.model";
import { ContentGalleryGrid } from "@components/contentBlocks/variants/contentGallery/galleryTypes/ContentGalleryGrid";

vi.mock("@components/lazyPicture/LazyPicture", () => ({
  LazyPicture: () => <span />,
}));

/**
 * Builds a gallery image.
 * @param basename File name of the image.
 * @returns The image as the API delivers it.
 */
const image = (basename: string): ImageDto =>
  ({
    basename,
    name: basename,
    description: basename,
    page_id: 4711,
    ext: "jpg",
    width: 1200,
    height: 800,
    modified: 1,
    filesize: 2,
  }) as ImageDto;

const IMAGES = [
  image("probe-1.jpg"),
  image("probe-2.jpg"),
  image("probe-3.jpg"),
];

describe("useLightGallery", () => {
  it("renders nothing of the lightbox while it was never opened", () => {
    render(<ContentGalleryGrid images={IMAGES} />);

    expect(document.querySelector(".lg-container")).toBeNull();
    expect(document.querySelector(".lg-backdrop")).toBeNull();
  });

  it("opens on the first click under StrictMode", async () => {
    render(
      <StrictMode>
        <ContentGalleryGrid images={IMAGES} />
      </StrictMode>
    );

    fireEvent.click(screen.getByTitle("probe-2.jpg in Galerie öffnen"));

    await waitFor(() =>
      expect(document.querySelector(".lg-container.lg-show")).not.toBeNull()
    );
    expect(document.querySelector(".lg-counter-current")?.textContent).toBe(
      "2"
    );
  });

  it("opens at the clicked image", async () => {
    render(<ContentGalleryGrid images={IMAGES} />);

    fireEvent.click(screen.getByTitle("probe-2.jpg in Galerie öffnen"));

    await waitFor(() =>
      expect(document.querySelector(".lg-container.lg-show")).not.toBeNull()
    );
    await waitFor(() => {
      const current = document.querySelector(".lg-current img.lg-object");
      expect(current?.getAttribute("src")).toContain("file=probe-2.jpg");
    });
    expect(document.querySelector(".lg-counter-current")?.textContent).toBe(
      "2"
    );
  });

  it("gives the focus back to the opening button when it is closed", async () => {
    render(<ContentGalleryGrid images={IMAGES} />);
    const trigger = screen.getByTitle("probe-3.jpg in Galerie öffnen");

    // Opened by keyboard: the button has the focus.
    trigger.focus();
    fireEvent.click(trigger);
    await waitFor(() =>
      expect(document.querySelector(".lg-container.lg-show")).not.toBeNull()
    );
    await waitFor(() =>
      expect(
        document.querySelector(".lg-container")?.contains(document.activeElement)
      ).toBe(true)
    );

    fireEvent.keyDown(window, { key: "Escape", keyCode: 27 });

    await waitFor(() =>
      expect(document.querySelector(".lg-container.lg-show")).toBeNull()
    );
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });
});

