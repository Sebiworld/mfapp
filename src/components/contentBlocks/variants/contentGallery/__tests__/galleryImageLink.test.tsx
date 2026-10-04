import { StrictMode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { ImageDto } from "@models/image-dto.model";
import { PageCardDto } from "@models/page/page-card-dto.model";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { DefaultPageDto } from "@models/page/default-page-dto.model";
import { ContentBlockDtoVariant } from "@models/content/content-block-dto-variant.model";
import { PageContents } from "@pages/page/pageContents/PageContents";
import { SidebarBoxGalleries } from "@pages/page/projectPage/projectSidebar/sidebarBoxGalleries/SidebarBoxGalleries";
import { getGalleryImageSlot, getGalleryImageSlots } from "../galleryImageLink";
import { ContentGalleryGrid } from "../galleryTypes/ContentGalleryGrid";
import "@utils/i18n/i18n";

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

const IMAGES = ["probe-1.jpg", "probe-2.jpg", "probe-3.jpg"].map(image);
// The second image repeats a file name of the first gallery; a gallery card leaves it out.
const OTHER_IMAGES = ["other-1.jpg", "probe-2.jpg", "other-3.jpg"].map(image);

const PROJECT_PATH = "/projekte/annie/";
const GALLERY_PATH = "/projekte/annie/galerien/premiere/";

const IMAGE_BLOCK_ID = 14;
const FIRST_GALLERY_ID = 12;
const SECOND_GALLERY_ID = 13;

// Cast: only the fields read by PageContents and the content blocks are set. In card order the page shows:
// 1 = single image, 2-4 = first gallery, 5 = other-1, 6 = other-3 (second gallery without the repeated file).
const GALLERY_PAGE = {
  id: 1,
  title: "Premiere",
  template: { id: 1, name: "gallery", label: "Galerie" },
  contents: [
    { id: 10, type: "text", depth: 0, text: "<p>Vorab</p>" },
    {
      id: IMAGE_BLOCK_ID,
      type: "image",
      depth: 0,
      image: image("single.jpg"),
    },
    { id: 11, type: "gallery", depth: 0, gallery_type: "grid", images: [] },
    {
      id: FIRST_GALLERY_ID,
      type: "gallery",
      depth: 0,
      gallery_type: "grid",
      images: IMAGES,
    },
    {
      id: SECOND_GALLERY_ID,
      type: "gallery",
      depth: 0,
      gallery_type: "masonry",
      images: OTHER_IMAGES,
    },
  ],
} as unknown as PageDtoVariant;

/**
 * Renders the gallery page at an address, with the project page before it in the history. Any other path renders
 * a placeholder, so the gallery page can be left.
 * @param search Query string of the gallery page's address.
 * @param strict Whether to render in StrictMode.
 * @returns The router, to read and change the location.
 */
const renderGalleryPage = (
  search: string,
  strict = false
): ReturnType<typeof createMemoryRouter> => {
  const router = createMemoryRouter(
    [
      {
        path: GALLERY_PATH,
        element: (
          <ThemeProvider
            theme={{ [THEME_ID]: mfTheme }}
            noSsr
            defaultMode="light"
          >
            <PageContents page={GALLERY_PAGE} />
          </ThemeProvider>
        ),
      },
      { path: "*", element: <div data-testid="other-page" /> },
    ],
    { initialEntries: [PROJECT_PATH, GALLERY_PATH + search], initialIndex: 1 }
  );
  render(
    strict ? (
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    ) : (
      <RouterProvider router={router} />
    )
  );
  return router;
};

/** Index (1-based) of the image the open lightbox shows. */
const shownImageNumber = (): string | null | undefined =>
  document.querySelector(".lg-container.lg-show .lg-counter-current")
    ?.textContent;

/** File URL of the image the open lightbox shows. */
const shownImageSrc = (): string | null | undefined =>
  document
    .querySelector(".lg-container.lg-show .lg-current img.lg-object")
    ?.getAttribute("src");

/**
 * Waits until a lightbox is open.
 * @returns Resolves once `.lg-show` is in the document.
 */
const waitForLightbox = (): Promise<void> =>
  waitFor(() =>
    expect(document.querySelector(".lg-container.lg-show")).not.toBeNull()
  );

describe("link from a gallery card to an image", () => {
  it("links each slide of the sidebar gallery to its 1-based position", async () => {
    const data = {
      galleries: [
        { id: 1, url: GALLERY_PATH, images: IMAGES } as unknown as PageCardDto,
      ],
      galleries_count: 1,
    };
    const router = createMemoryRouter(
      [{ path: "*", element: <SidebarBoxGalleries data={data} /> }],
      { initialEntries: [PROJECT_PATH] }
    );
    render(<RouterProvider router={router} />);

    // The virtual slider renders only the first slides in jsdom.
    const first = await screen.findByTitle("probe-1.jpg in Galerie öffnen");
    const second = screen.getByTitle("probe-2.jpg in Galerie öffnen");

    expect(first.getAttribute("href")).toBe(`${GALLERY_PATH}?bild=1`);
    expect(second.getAttribute("href")).toBe(`${GALLERY_PATH}?bild=2`);

    fireEvent.click(second);

    await waitFor(() =>
      expect(router.state.location.pathname).toBe(GALLERY_PATH)
    );
    expect(router.state.location.search).toBe("?bild=2");
    expect(document.querySelector(".lg-container")).toBeNull();
  });
});

describe("gallery page opened with an image number", () => {
  let scrolledInto: Element[];
  let earlierLightboxes: Set<Element>;

  /** Lightbox containers created in this test (lightGallery removes earlier ones only after a delay). */
  const newLightboxes = (): Element[] =>
    Array.from(document.querySelectorAll(".lg-container")).filter(
      (container) => !earlierLightboxes.has(container)
    );

  beforeEach(() => {
    // jsdom has no matchMedia; the theme's color scheme listens to one.
    window.matchMedia = ((query: string) => ({
      matches: false,
      media: query,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    })) as unknown as typeof window.matchMedia;
    scrolledInto = [];
    // jsdom has no layout and does not implement scrollIntoView.
    Element.prototype.scrollIntoView = function (this: Element) {
      scrolledInto.push(this);
    };
    earlierLightboxes = new Set(document.querySelectorAll(".lg-container"));
  });

  afterEach(() => {
    // @ts-expect-error jsdom provides no matchMedia; restore that state.
    delete window.matchMedia;
    // Removes the stub again: jsdom has no scrollIntoView of its own.
    delete (Element.prototype as Partial<Element>).scrollIntoView;
  });

  it("scrolls to the first gallery and opens its lightbox at that image", async () => {
    renderGalleryPage("?bild=3");

    await waitForLightbox();
    await waitFor(() => expect(shownImageSrc()).toContain("file=probe-2.jpg"));
    expect(shownImageNumber()).toBe("2");
    expect(newLightboxes()).toHaveLength(1);
    expect(scrolledInto).toHaveLength(1);
    expect(
      scrolledInto[0].querySelector('[title="probe-1.jpg in Galerie öffnen"]')
    ).not.toBeNull();
  });

  it("counts on into the second gallery, without the repeated file", async () => {
    renderGalleryPage("?bild=6");

    await waitForLightbox();
    await waitFor(() => expect(shownImageSrc()).toContain("file=other-3.jpg"));
    expect(shownImageNumber()).toBe("3");
    expect(newLightboxes()).toHaveLength(1);
    expect(scrolledInto).toHaveLength(1);
    expect(scrolledInto[0].classList.contains("gallery-type-masonry")).toBe(
      true
    );
  });

  it("scrolls to a single image before the galleries and opens it", async () => {
    renderGalleryPage("?bild=1");

    await waitForLightbox();
    await waitFor(() => expect(shownImageSrc()).toContain("file=single.jpg"));
    expect(newLightboxes()).toHaveLength(1);
    expect(scrolledInto).toHaveLength(1);
    expect(scrolledInto[0].classList.contains("content-image")).toBe(true);
  });

  it("opens once under StrictMode", async () => {
    renderGalleryPage("?bild=3", true);

    await waitForLightbox();
    await waitFor(() => expect(shownImageSrc()).toContain("file=probe-2.jpg"));
    // Some time for a second opening.
    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(newLightboxes()).toHaveLength(1);
    expect(shownImageNumber()).toBe("2");
  });

  it.each(["?bild=0", "?bild=7", "?bild=abc", "?bild=2.5", "?bild=", ""])(
    "opens no lightbox for %j",
    async (search) => {
      const router = renderGalleryPage(search);

      await screen.findByTitle("probe-2.jpg in Galerie öffnen");
      // Some time for a lightbox that should not open.
      await new Promise((resolve) => setTimeout(resolve, 300));

      expect(newLightboxes()).toHaveLength(0);
      expect(scrolledInto).toHaveLength(0);
      expect(router.state.location.search).toBe(search);
    }
  );

  it("removes the image number on close without a history entry, so back leads to the project page", async () => {
    const router = renderGalleryPage("?bild=4");

    await waitForLightbox();
    expect(shownImageNumber()).toBe("3");

    fireEvent.keyDown(window, { key: "Escape", keyCode: 27 });

    await waitFor(() => expect(router.state.location.search).toBe(""));
    expect(router.state.location.pathname).toBe(GALLERY_PATH);
    expect(router.state.historyAction).toBe("REPLACE");
    expect(document.querySelector(".lg-container.lg-show")).toBeNull();

    await router.navigate(-1);

    expect(router.state.location.pathname).toBe(PROJECT_PATH);
  });

  it("leaves the address of the next page alone when the page is left with an open lightbox", async () => {
    const router = renderGalleryPage("?bild=3");

    await waitForLightbox();

    await router.navigate(`${PROJECT_PATH}?tab=2#anker`);
    await screen.findByTestId("other-page");
    // lightGallery reports the close of the destroyed lightbox with a delay.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(router.state.location.pathname).toBe(PROJECT_PATH);
    expect(router.state.location.search).toBe("?tab=2");
    expect(router.state.location.hash).toBe("#anker");
  });
});

describe("lightbox items when the page is loaded again", () => {
  it("stays open when the same images arrive as new objects", async () => {
    // A page from the persisted store is shown first, then replaced by the response with equal content.
    const onClose = vi.fn();
    const { rerender } = render(
      <ContentGalleryGrid images={IMAGES} openIndex={1} onClose={onClose} />
    );

    await waitForLightbox();

    rerender(
      <ContentGalleryGrid
        images={IMAGES.map((item) => ({ ...item }))}
        openIndex={1}
        onClose={onClose}
      />
    );
    // Some time for an unwanted close.
    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(onClose).not.toHaveBeenCalled();
    expect(document.querySelectorAll(".lg-container")).toHaveLength(1);
    expect(document.querySelector(".lg-container.lg-show")).not.toBeNull();
    expect(shownImageNumber()).toBe("2");
  });

  it("takes changed images of the same number", async () => {
    const { rerender } = render(<ContentGalleryGrid images={IMAGES} />);

    fireEvent.click(screen.getByTitle("probe-2.jpg in Galerie öffnen"));
    await waitForLightbox();
    await waitFor(() => expect(shownImageSrc()).toContain("v=1.2"));
    fireEvent.keyDown(window, { key: "Escape", keyCode: 27 });
    await waitFor(() =>
      expect(document.querySelector(".lg-container.lg-show")).toBeNull()
    );

    // The second image was replaced by a new file version.
    rerender(
      <ContentGalleryGrid
        images={IMAGES.map((item, index) =>
          index === 1 ? { ...item, modified: 99 } : item
        )}
      />
    );
    fireEvent.click(screen.getByTitle("probe-2.jpg in Galerie öffnen"));

    await waitForLightbox();
    await waitFor(() => expect(shownImageSrc()).toContain("v=99.2"));
  });
});

describe("getGalleryImageSlots", () => {
  it("counts like a gallery card: block by block, single and placeholder images, repeated gallery files once", () => {
    const blocks = [
      { id: 1, type: "text" },
      { id: 2, type: "image", image: image("a.jpg") },
      { id: 3, type: "image" },
      { id: 4, type: "youtube-video", placeholder_image: image("v.jpg") },
      { id: 5, type: "gallery", images: [image("b.jpg"), image("c.jpg")] },
      { id: 6, type: "image", image: image("b.jpg") },
      { id: 7, type: "gallery", images: [image("c.jpg"), image("d.jpg")] },
    ] as unknown as ContentBlockDtoVariant[];

    expect(getGalleryImageSlots(blocks)).toEqual([
      { blockId: 2, index: 0 },
      { blockId: 4, index: 0 },
      { blockId: 5, index: 0 },
      { blockId: 5, index: 1 },
      { blockId: 6, index: 0 },
      { blockId: 7, index: 1 },
    ]);
  });

  it("accepts only whole numbers from 1 to the number of images", () => {
    const slots = getGalleryImageSlots(
      (GALLERY_PAGE as DefaultPageDto).contents
    );

    expect(slots).toHaveLength(6);
    expect(getGalleryImageSlot(slots, "1")).toEqual({
      blockId: IMAGE_BLOCK_ID,
      index: 0,
    });
    expect(getGalleryImageSlot(slots, "04")).toEqual({
      blockId: FIRST_GALLERY_ID,
      index: 2,
    });
    expect(getGalleryImageSlot(slots, "6")).toEqual({
      blockId: SECOND_GALLERY_ID,
      index: 2,
    });
    expect(getGalleryImageSlot(slots, "0")).toBeNull();
    expect(getGalleryImageSlot(slots, "7")).toBeNull();
    expect(getGalleryImageSlot(slots, "-1")).toBeNull();
    expect(getGalleryImageSlot(slots, "1e0")).toBeNull();
    expect(getGalleryImageSlot(slots, " 2")).toBeNull();
    expect(getGalleryImageSlot(slots, null)).toBeNull();
  });
});
