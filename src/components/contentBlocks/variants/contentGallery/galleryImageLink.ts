import { createContext } from "react";
import { ContentBlockDtoVariant } from "@models/content/content-block-dto-variant.model";
import { ContentBlockGalleryDto } from "@models/content/content-block-gallery-dto.model";
import { ContentBlockImageDto } from "@models/content/content-block-image-dto.model";
import { ContentBlockYoutubeVideoDto } from "@models/content/content-block-youtube-video-dto.model";

/** Query parameter of a gallery page that points to an image (1-based position among all images of the page). */
export const GALLERY_IMAGE_PARAM = "bild";

/** Position of one image of a page: the content block that shows it and its index there. */
export interface GalleryImageSlot {
  blockId: number;
  index: number;
}

/** Images of the current page in the order of a gallery card, see `getGalleryImageSlots`. */
export const GalleryImageLinkContext = createContext<GalleryImageSlot[]>([]);

/**
 * Builds the link to an image on a gallery page.
 * @param url Path of the gallery page.
 * @param index 0-based position of the image on the gallery card.
 * @returns Router target with the 1-based image number as query parameter.
 */
export const getGalleryImageLink = (
  url: string,
  index: number
): { pathname: string; search: string } => ({
  pathname: url,
  search: `?${GALLERY_IMAGE_PARAM}=${index + 1}`,
});

/**
 * Lists the images of a page in the order in which the gallery card of the page shows them: block by block, the
 * image of an image block, the placeholder image of a video block and the images of a gallery block. A gallery
 * image whose file name already came from an earlier gallery block is left out, as the card does.
 * @param blocks Content blocks of the page (the API delivers them as a flat list in page order).
 * @returns One slot per counted image.
 */
export const getGalleryImageSlots = (
  blocks?: ContentBlockDtoVariant[]
): GalleryImageSlot[] => {
  const slots: GalleryImageSlot[] = [];
  const galleryBasenames = new Set<string>();

  for (const block of blocks ?? []) {
    if (block.type === "image") {
      if ((block as ContentBlockImageDto).image?.basename) {
        slots.push({ blockId: block.id, index: 0 });
      }

      continue;
    }

    if (block.type === "youtube-video") {
      if ((block as ContentBlockYoutubeVideoDto).placeholder_image?.basename) {
        slots.push({ blockId: block.id, index: 0 });
      }

      continue;
    }

    if (block.type !== "gallery") {
      continue;
    }

    const images = (block as ContentBlockGalleryDto).images ?? [];

    for (let index = 0; index < images.length; index++) {
      const basename = images[index]?.basename;

      if (!basename || galleryBasenames.has(basename)) {
        continue;
      }

      galleryBasenames.add(basename);
      slots.push({ blockId: block.id, index });
    }
  }

  return slots;
};

/**
 * Finds the image a value of `GALLERY_IMAGE_PARAM` points to.
 * @param slots Images of the page, see `getGalleryImageSlots`.
 * @param value Raw parameter value (`null` if absent).
 * @returns The slot, or `null` if the value is not a whole number from 1 to the number of images.
 */
export const getGalleryImageSlot = (
  slots: GalleryImageSlot[],
  value: string | null
): GalleryImageSlot | null => {
  if (!value || !/^\d+$/.test(value)) {
    return null;
  }

  return slots[Number(value) - 1] ?? null;
};
