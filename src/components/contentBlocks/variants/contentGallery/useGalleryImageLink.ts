import {
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { useSearchParams } from "react-router";
import {
  GALLERY_IMAGE_PARAM,
  GalleryImageLinkContext,
  getGalleryImageSlot,
} from "./galleryImageLink";

export interface UseGalleryImageLinkReturn {
  /** Element of the block; the page scrolls to it when the link points to an image of the block. */
  containerRef: RefObject<HTMLDivElement | null>;
  /** Index of the linked image in the block, `null` if the link points elsewhere or there is none. */
  openIndex: number | null;
  /** To be called when the block's lightbox closes: removes the image number from the address. */
  onLightboxClose: () => void;
}

/**
 * Connects a content block to a link to one of the page's images (`?bild=<number>`): scrolls to the block that
 * shows the image and tells the block which image to open.
 * @param blockId Id of the content block.
 * @returns Ref for the block's element, the index to open and the close handler for the block's lightbox.
 */
export const useGalleryImageLink = (
  blockId?: number
): UseGalleryImageLinkReturn => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const slots = useContext(GalleryImageLinkContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const imageParam = searchParams.get(GALLERY_IMAGE_PARAM);
  const slot = getGalleryImageSlot(slots, imageParam);
  const isTarget = !!slot && blockId !== undefined && slot.blockId === blockId;
  const openIndex = isTarget ? slot.index : null;
  const scrollKey = isTarget ? imageParam : null;

  // Before the first paint, so the page shows up at the block and does not move once the lightbox is open.
  useLayoutEffect(() => {
    if (scrollKey === null) {
      return;
    }

    containerRef.current?.scrollIntoView({
      block: "start",
      behavior: "instant",
    });
  }, [scrollKey]);

  // The image number is only the way in: once the lightbox is closed it leaves the address without a history entry.
  const removeImageParamRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    removeImageParamRef.current = () => {
      if (!isTarget) {
        return;
      }

      setSearchParams(
        (params) => {
          const next = new URLSearchParams(params);
          next.delete(GALLERY_IMAGE_PARAM);
          return next;
        },
        { replace: true, preventScrollReset: true }
      );
    };

    // lightGallery reports a close only after the block is gone (e.g. on leaving the page with an open lightbox);
    // by then the address belongs to another page and must stay as it is.
    return () => {
      removeImageParamRef.current = () => undefined;
    };
  }, [isTarget, setSearchParams]);

  // Stable: lightGallery is set up again whenever one of its handlers changes.
  const onLightboxClose = useCallback(() => {
    removeImageParamRef.current();
  }, []);

  return { containerRef, openIndex, onLightboxClose };
};
