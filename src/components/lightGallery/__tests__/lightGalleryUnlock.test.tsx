import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ImageDto } from "@models/image-dto.model";
import { ContentGalleryGrid } from "@components/contentBlocks/variants/contentGallery/galleryTypes/ContentGalleryGrid";
import { PageUnlockContext } from "@src/context/pageUnlock/PageUnlockContext";

vi.mock("@components/lazyPicture/LazyPicture", () => ({
  LazyPicture: () => <span />,
}));

// Cast: only the fields the gallery reads are set.
const IMAGES = [
  {
    basename: "probe-1.jpg",
    name: "probe-1.jpg",
    description: "probe-1.jpg",
    page_id: 4711,
    ext: "jpg",
    width: 1200,
    height: 800,
    modified: 1,
    filesize: 2,
  } as ImageDto,
];

/**
 * Opens the lightbox and returns its download link.
 * @param withKey Whether the link of this gallery carries a key; tells it apart from a lightbox an earlier test left.
 * @returns The link element.
 */
const openDownloadLink = async (
  withKey: boolean
): Promise<HTMLAnchorElement> => {
  fireEvent.click(screen.getByTitle("probe-1.jpg in Galerie öffnen"));

  let link: HTMLAnchorElement | null = null;
  await waitFor(() => {
    // lightGallery leaves earlier containers in the document; the newest one belongs to this test.
    const links = document.querySelectorAll<HTMLAnchorElement>(
      ".lg-container.lg-show .lg-download"
    );
    link = links[links.length - 1] ?? null;
    expect(link?.getAttribute("href")).toContain("file=probe-1.jpg");
    expect(link?.getAttribute("href")?.includes("unlock=")).toBe(withKey);
  });

  return link!;
};

describe("lightbox download link and link tracking", () => {
  it("leaves downloads of other pages tracked", async () => {
    render(<ContentGalleryGrid images={IMAGES} />);

    const link = await openDownloadLink(false);

    expect(link.getAttribute("href")).not.toContain("unlock=");
    expect(link).not.toHaveClass("matomo_ignore");
  });

  it("keeps the download of a protected page out of Matomo's link tracking", async () => {
    render(
      <PageUnlockContext.Provider value="k1">
        <ContentGalleryGrid images={IMAGES} />
      </PageUnlockContext.Provider>
    );

    const link = await openDownloadLink(true);

    expect(link.getAttribute("href")).toContain("unlock=k1");
    expect(link).toHaveClass("matomo_ignore");
  });
});
