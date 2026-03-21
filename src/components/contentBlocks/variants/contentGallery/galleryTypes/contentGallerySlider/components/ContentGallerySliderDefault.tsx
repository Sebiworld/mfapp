import { ImageDto } from "@models/image-dto.model";
import { Box, Button } from "@mui/material";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Import Swiper React components
import { Thumbs, Pagination, Virtual } from "swiper/modules";

// Import Swiper styles
import "swiper/css/bundle";
import { LightGallery } from "lightgallery/lightgallery";
import { ContentGallerySliderItem } from "./ContentGallerySliderItem";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

interface ContentGallerySliderDefaultProps {
  images: ImageDto[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  lightGalleryRef: React.RefObject<LightGallery | null>;
  detailLink?: string;
  onClose?: () => void;
}

export const ContentGallerySliderDefault: React.FC<
  ContentGallerySliderDefaultProps
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
    <Box className="slider-wrapper default-slider">
      <Swiper
        init={true}
        modules={[Thumbs, Pagination, Virtual]}
        slidesPerView={"auto"}
        spaceBetween={16}
        centeredSlides={false}
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
