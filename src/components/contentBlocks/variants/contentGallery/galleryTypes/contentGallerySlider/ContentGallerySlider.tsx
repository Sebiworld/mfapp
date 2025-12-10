import { Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import { ImageDto } from "@models/image-dto.model";

import { useLightGallery } from "@components/lightGallery/useLightGallery";
import { ContentGallerySliderDefault } from "./components/ContentGallerySliderDefault";
import { ContentGallerySliderFeaturedSlider } from "./components/ContentGallerySliderFeaturedSlider";

export interface ContentGallerySliderProps {
  images: ImageDto[];
  detailLink?: string;
  onClose?: () => void;
  galleryType?: string;
}

export const ContentGallerySlider: React.FC<ContentGallerySliderProps> = ({
  images,
  detailLink,
  onClose,
  galleryType,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const onLightGalleryClose = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const { ref: lightGalleryRef, element: lightGalleryElement } =
    useLightGallery({
      images,
      onClose: onLightGalleryClose,
    });

  return (
    <Box className={`gallery-container content-gallery-slider`}>
      {lightGalleryElement}

      {galleryType === "featured_slider" ? (
        <ContentGallerySliderFeaturedSlider
          images={images}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          lightGalleryRef={lightGalleryRef}
          detailLink={detailLink}
          onClose={onClose}
        />
      ) : (
        <ContentGallerySliderDefault
          images={images}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          lightGalleryRef={lightGalleryRef}
          detailLink={detailLink}
          onClose={onClose}
        />
      )}
    </Box>
  );
};
