import { Box, Button } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ImageDto } from "@models/image-dto.model";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Import Swiper React components
import { Thumbs, Pagination, Virtual } from "swiper/modules";

// Import Swiper styles
import "swiper/css/bundle";

import { useLightGallery } from "@components/lightGallery/useLightGallery";
import { ContentGallerySliderItemButton } from "./components/ContentGallerySliderItemButton";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { useTranslation } from "react-i18next";

export interface ContentGallerySliderProps {
  images: ImageDto[];
  detailLink?: string;
  onClose?: () => void;
}

export const ContentGallerySlider: React.FC<ContentGallerySliderProps> = ({
  images,
  detailLink,
  onClose,
}) => {
  const { t } = useTranslation();

  const swiperElRef = useRef<SwiperRef | null>(null);
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
    swiperElRef.current?.swiper?.slideTo(activeIndex, 0);
  }, [activeIndex]);

  return (
    <Box className={`gallery-container content-gallery-slider`}>
      {lightGalleryElement}

      <Box className="slider-outer-wrapper">
        <Box className="slider-wrapper">
          <Swiper
            init={true}
            modules={[Thumbs, Pagination, Virtual]}
            slidesPerView={1}
            spaceBetween={16}
            centeredSlides={false}
            virtual
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            ref={swiperElRef}
          >
            {images?.map((image, index) => {
              return (
                <SwiperSlide
                  key={`${image.page_id}#${image.basename}`}
                  virtualIndex={index}
                >
                  <ContentGallerySliderItemButton
                    detailLink={detailLink}
                    onClick={() => {
                      lightGalleryRef?.current?.openGallery(index);
                      if (typeof onClose === "function") {
                        onClose();
                      }
                    }}
                    title={`${image?.description || "Bild"} in Galerie öffnen`}
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
                  </ContentGallerySliderItemButton>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <Button
            className="swiper-action action-prev icon-only"
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => swiperElRef.current?.swiper.slidePrev()}
            title={t("general.actions.previous")}
            disabled={activeIndex <= 0}
          ></Button>

          <Button
            className="swiper-action action-next icon-only"
            variant="contained"
            startIcon={<ArrowForwardIcon />}
            onClick={() => swiperElRef.current?.swiper.slideNext()}
            title={t("general.actions.forward")}
            disabled={activeIndex >= images.length - 1}
          ></Button>
        </Box>
      </Box>
    </Box>
  );
};
