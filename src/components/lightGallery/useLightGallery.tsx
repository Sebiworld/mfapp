import {
  lazy,
  ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ImageDto } from "@models/image-dto.model";

import {
  AfterCloseDetail,
  AfterSlideDetail,
  InitDetail,
} from "lightgallery/lg-events";
import type { LightGallery } from "lightgallery/lightgallery";
import { getGalleryItemsFromImages } from "./getGalleryItemsFromImages";

const LightGalleryWithPlugins = lazy(() =>
  import("./LightGalleryWithPlugins").then((m) => ({
    default: m.LightGalleryWithPlugins,
  }))
);

export interface UseLightGalleryProps {
  images: ImageDto[];
  onIndexChange?: (index: number) => void;
  onClose?: (index: number) => void;
  /** Image to open the gallery at without a click (e.g. from a link); `null` while there is none. */
  openIndex?: number | null;
}

export interface UseLightGalleryReturn {
  element?: ReactNode;
  /** Opens the gallery at an image; the first call loads and sets up the gallery. */
  openGallery: (index?: number) => void;
}

/**
 * Lightbox for a list of images. Nothing of the gallery (library, plugins, thumbnails) is loaded or rendered
 * before it is opened for the first time; after that the instance is kept for further openings.
 * @param images Images of the gallery.
 * @param onIndexChange Called with the index of the shown image whenever it changes.
 * @param onClose Called with the index of the last shown image when the gallery is closed.
 * @param openIndex Image to open the gallery at; it opens whenever this changes to an index.
 * @returns The gallery element to render (empty until the first opening) and `openGallery`.
 */
export const useLightGallery = ({
  images,
  onIndexChange,
  onClose,
  openIndex = null,
}: UseLightGalleryProps): UseLightGalleryReturn => {
  const lightGalleryRef = useRef<LightGallery | null>(null);
  // Index to open once the gallery has been set up after the first request.
  const pendingIndexRef = useRef<number | null>(null);
  // Element that had the focus when the gallery was opened; it gets the focus back when the gallery closes.
  const openerRef = useRef<HTMLElement | null>(null);
  // Last `openIndex` the gallery was opened at, so a second effect run (StrictMode) does not open it again.
  const openedAtIndexRef = useRef<number | null>(null);
  const [isRequested, setIsRequested] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const builtItems = useMemo(() => getGalleryItemsFromImages(images), [images]);
  const builtItemsKey = useMemo(
    () => JSON.stringify(builtItems ?? null),
    [builtItems]
  );
  // Kept as long as the content is the same: lightGallery is set up again (and an open lightbox closed) whenever the
  // items change, and a reloaded page delivers the same images as new objects.
  const [keptItems, setKeptItems] = useState({
    key: builtItemsKey,
    items: builtItems,
  });

  if (keptItems.key !== builtItemsKey) {
    setKeptItems({ key: builtItemsKey, items: builtItems });
  }

  const galleryItems =
    keptItems.key === builtItemsKey ? keptItems.items : builtItems;

  const onInit = useCallback((detail: InitDetail) => {
    if (!detail) {
      return;
    }

    const instance = detail.instance;
    lightGalleryRef.current = instance;

    // The init event fires inside the constructor; open once the setup has finished. In development React sets
    // the gallery up twice: only the instance that is still current opens and takes the pending index.
    queueMicrotask(() => {
      const pendingIndex = pendingIndexRef.current;

      if (pendingIndex === null || lightGalleryRef.current !== instance) {
        return;
      }

      pendingIndexRef.current = null;
      instance.openGallery(pendingIndex);
    });
  }, []);

  const openGallery = useCallback((index = 0) => {
    const focused = document.activeElement;
    openerRef.current =
      focused instanceof HTMLElement && focused !== document.body
        ? focused
        : null;

    if (lightGalleryRef.current) {
      lightGalleryRef.current.openGallery(index);
      return;
    }

    pendingIndexRef.current = index;
    setIsRequested(true);
  }, []);

  const onAfterSlide = useCallback((detail: AfterSlideDetail) => {
    setActiveIndex(detail.index);
  }, []);

  const onAfterClose = useCallback(
    (detail: AfterCloseDetail) => {
      setActiveIndex(detail.instance?.index);

      // Without this the focus stays on the removed lightbox and falls back to the start of the page.
      const opener = openerRef.current;
      openerRef.current = null;

      if (opener?.isConnected) {
        opener.focus({ preventScroll: true });
      }

      if (onClose) {
        onClose(detail.instance?.index);
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (openIndex === null) {
      openedAtIndexRef.current = null;
      return;
    }

    if (openedAtIndexRef.current === openIndex) {
      return;
    }

    openedAtIndexRef.current = openIndex;
    openGallery(openIndex);
  }, [openGallery, openIndex]);

  useEffect(() => {
    lightGalleryRef?.current?.refresh();
  }, [galleryItems]);

  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(activeIndex);
    }
  }, [activeIndex, onIndexChange]);

  const element = useMemo(() => {
    if (!isRequested) {
      return null;
    }

    return (
      <Suspense fallback={null}>
        <LightGalleryWithPlugins
          licenseKey={import.meta.env.VITE_LGLIC}
          dynamic={true}
          dynamicEl={galleryItems}
          supportLegacyBrowser={false}
          onInit={onInit}
          onAfterSlide={onAfterSlide}
          onAfterClose={onAfterClose}
        ></LightGalleryWithPlugins>
      </Suspense>
    );
  }, [galleryItems, isRequested, onAfterClose, onAfterSlide, onInit]);

  return {
    element,
    openGallery,
  };
};
