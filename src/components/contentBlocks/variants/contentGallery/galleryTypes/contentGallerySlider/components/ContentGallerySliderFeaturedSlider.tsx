import { ImageDto } from "@models/image-dto.model";
import { Box, Button } from "@mui/material";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Import Swiper React components
import { Thumbs, Pagination, Virtual } from "swiper/modules";

import EffectCarousel from "../../../../../../swiper/effects/effect-carousel.esm";

// Import Swiper styles
import "swiper/css/bundle";

import { LightGallery } from "lightgallery/lightgallery";
import { ContentGallerySliderItem } from "./ContentGallerySliderItem";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

interface ContentGallerySliderFeaturedSliderProps {
  images: ImageDto[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  lightGalleryRef: React.RefObject<LightGallery | null>;
  detailLink?: string;
  onClose?: () => void;
}

export const ContentGallerySliderFeaturedSlider: React.FC<
  ContentGallerySliderFeaturedSliderProps
> = ({
  images,
  setActiveIndex,
  lightGalleryRef,
  activeIndex,
  detailLink,
  onClose,
}) => {
  const { t } = useTranslation();
  const swiperElRef = useRef<SwiperRef | null>(null);

  const [allowSlidePrev, setAllowSlidePrev] = useState<boolean>(true);
  const [allowSlideNext, setAllowSlideNext] = useState<boolean>(true);

  useEffect(() => {
    swiperElRef.current?.swiper?.slideTo(activeIndex, 0);
  }, [activeIndex]);

  return (
    <Box className="slider-wrapper featured-slider">
      <Swiper
        init={true}
        modules={[Virtual, Thumbs, Pagination, EffectCarousel]}
        slidesPerView={"auto"}
        // spaceBetween={16}
        grabCursor={true}
        centeredSlides={true}
        effect={"carousel"}
        // @ts-expect-error - carouselEffect is a custom prop provided by the EffectCarousel module
        carouseleffect={{
          // opacity change per side slide
          opacityStep: 0.8,
          // scale change per side slide
          scaleStep: 0.9,
          // amount of side slides visible, can be 1, 2 or 3
          sideSlides: 5,
        }}
        pagination={{ clickable: true }}
        virtual
        onInit={(swiper) => {
          setAllowSlidePrev(!swiper.isBeginning);
          setAllowSlideNext(!swiper.isEnd);
        }}
        onReachBeginning={() => {
          setAllowSlidePrev(false);
        }}
        onReachEnd={() => {
          setAllowSlideNext(false);
        }}
        onFromEdge={() => {
          setAllowSlidePrev(true);
          setAllowSlideNext(true);
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
        ref={swiperElRef}
      >
        {images?.map((image, index) => (
          <SwiperSlide
            virtualIndex={index}
            key={`${image.page_id}#${image.basename}`}
          >
            <ContentGallerySliderItem
              index={index}
              image={image}
              lightGalleryRef={lightGalleryRef}
              onClose={onClose}
              detailLink={detailLink}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Button
        className="swiper-action action-prev icon-only"
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => swiperElRef.current?.swiper.slidePrev()}
        title={t("general.actions.previous")}
        disabled={!allowSlidePrev}
      ></Button>

      <Button
        className="swiper-action action-next icon-only"
        variant="contained"
        startIcon={<ArrowForwardIcon />}
        onClick={() => swiperElRef.current?.swiper.slideNext()}
        title={t("general.actions.forward")}
        disabled={!allowSlideNext}
      ></Button>
    </Box>
  );
};
