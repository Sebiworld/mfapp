import { Box, Button } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ImageDto } from "@models/image-dto.model";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { Swiper, SwiperOptions } from "swiper/types";

// Import Swiper React components
import { SwiperContainer, register } from "swiper/element/bundle";
import { Thumbs, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css/bundle";
import { useLightGallery } from "@components/lightGallery/useLightGallery";

export interface ContentGallerySliderProps {
  images: ImageDto[];
}

export const ContentGallerySlider: React.FC<ContentGallerySliderProps> = ({
  images,
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
          <swiper-container ref={swiperElRef} init="false">
            {images?.map((image, index) => {
              return (
                <swiper-slide
                  key={`${image.page_id}#${image.basename}`}
                  lazy="true"
                >
                  <Button
                    className="image-button"
                    onClick={() => {
                      lightGalleryRef?.current?.openGallery(index);
                    }}
                  >
                    <LazyPicture
                      image={image}
                      sizes={[
                        {
                          media: "(max-width: 500px)",
                          width: 500,
                        },
                        {
                          media: "(max-width: 800px)",
                          width: 800,
                        },
                        {
                          width: 1200,
                        },
                      ]}
                    />
                  </Button>
                </swiper-slide>
              );
            })}
          </swiper-container>
        </Box>
      </Box>
    </Box>
  );
};
