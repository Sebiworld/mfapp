import { Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import { ImageDto } from "@models/image-dto.model";

import { useLightGallery } from "@components/lightGallery/useLightGallery";
import { ContentGallerySliderDefault } from "./components/ContentGallerySliderDefault";
import { ContentGallerySliderFeaturedSlider } from "./components/ContentGallerySliderFeaturedSlider";
import { ContentGallerySliderPanoramaSlider } from "./components/ContentGallerySliderPanoramaSlider";

export interface ContentGallerySliderProps {
  images: ImageDto[];
  detailLink?: string;
  /** Called right before the lightbox opens, e.g. so a surrounding modal lets the lightbox have focus and keys. */
  onOpen?: () => void;
  /**
   * Called when the slider is left: after its lightbox has been closed, or on a click on a slide that links to
   * `detailLink` (e.g. to close a surrounding modal).
   */
  onClose?: () => void;
  galleryType?: string;
  /** Image to open the lightbox at without a click; `null` while there is none. */
  openIndex?: number | null;
}

export const ContentGallerySlider: React.FC<ContentGallerySliderProps> = ({
  images,
  detailLink,
  onOpen,
  onClose,
  galleryType,
  openIndex,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // A surrounding modal is closed only now: closing it on opening would unmount the lightbox with it.
  const onLightGalleryClose = useCallback(
    (index: number) => {
      setActiveIndex(index);
      onClose?.();
    },
    [onClose]
  );

  const { openGallery: openLightGallery, element: lightGalleryElement } =
    useLightGallery({
      images,
      onClose: onLightGalleryClose,
      openIndex,
    });

  const openGallery = useCallback(
    (index: number) => {
      onOpen?.();
      openLightGallery(index);
    },
    [onOpen, openLightGallery]
  );

  return (
    <Box className={`gallery-container content-gallery-slider`}>
      {lightGalleryElement}

      {galleryType === "featured_slider" ? (
        <ContentGallerySliderFeaturedSlider
          images={images}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          openGallery={openGallery}
          detailLink={detailLink}
          onLinkClick={onClose}
        />
      ) : galleryType === "panorama_slider" ? (
        <ContentGallerySliderPanoramaSlider
          images={images}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          openGallery={openGallery}
          detailLink={detailLink}
          onLinkClick={onClose}
        />
      ) : (
        <ContentGallerySliderDefault
          images={images}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          openGallery={openGallery}
          detailLink={detailLink}
          onLinkClick={onClose}
        />
      )}
    </Box>
  );
};
