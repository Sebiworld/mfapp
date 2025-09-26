import { Box } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ImageDto } from "@models/image-dto.model";
import { Swiper, SwiperOptions } from "swiper/types";

// Import Swiper React components
import { SwiperContainer, register } from "swiper/element/bundle";
import { Thumbs, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css/bundle";

import { useLightGallery } from "@components/lightGallery/useLightGallery";
import { ContentGallerySliderItem } from "./components/ContentGallerySliderItem";
import { SwiperContainerElement } from "@utils/components/SwiperContainerElement";

export interface ContentGallerySliderProps {
  images: ImageDto[];
  detailLink?: string;
}

export const ContentGallerySlider: React.FC<ContentGallerySliderProps> = ({
  images,
  detailLink,
}) => {
  const swiperElRef = useRef<SwiperContainer | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const onLightGalleryClose = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const { ref: lightGalleryRef, element: lightGalleryElement } =
    useLightGallery({
      images,
      onClose: onLightGalleryClose,
    });

  useEffect(() => {
    if (!swiperElRef?.current) {
      return;
    }
    register();

    const swiperContainer = swiperElRef.current as SwiperContainer;

    const params: SwiperOptions = {
      slidesPerView: 1,
      spaceBetween: 16,
      centeredSlides: false,
      navigation: true,
      modules: [Thumbs, Pagination],
      on: {
        slideChange: (swiper: Swiper) => {
          setActiveIndex(swiper.activeIndex);
        },
      },
    };
    Object.assign(swiperContainer, params);

    swiperContainer.initialize();
  }, []);

  useEffect(() => {
    swiperElRef.current?.swiper?.slideTo(activeIndex, 0);
  }, [activeIndex]);

  return (
    <Box className={`gallery-container content-gallery-slider`}>
      {lightGalleryElement}

      <Box className="slider-outer-wrapper">
        <Box className="slider-wrapper">
          <SwiperContainerElement ref={swiperElRef} init="false">
            {images?.map((image, index) => {
              return (
                <ContentGallerySliderItem
                  key={`${image.page_id}#${image.basename}`}
                  image={image}
                  detailLink={detailLink}
                  onClick={() => {
                    lightGalleryRef?.current?.openGallery(index);
                  }}
                />
              );
            })}
          </SwiperContainerElement>
        </Box>
      </Box>
    </Box>
  );
};
