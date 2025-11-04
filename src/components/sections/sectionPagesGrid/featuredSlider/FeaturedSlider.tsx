import React, { useRef, useState } from "react";

// Import Swiper React components
import { Thumbs, Pagination, EffectCoverflow } from "swiper/modules";

// Import Swiper styles
import "swiper/css/bundle";

import { SectionPagesGridDto } from "@models/section/section-pages-grid-dto.model";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { featuredSliderStyles } from "./featuredSlider.styles";
import { Box, Button, Link } from "@mui/material";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTranslation } from "react-i18next";

export interface FeaturedSliderProps {
  section: SectionPagesGridDto;
}

export const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ section }) => {
  const { t } = useTranslation();
  const swiperElRef = useRef<SwiperRef | null>(null);
  const [allowSlidePrev, setAllowSlidePrev] = useState<boolean>(true);
  const [allowSlideNext, setAllowSlideNext] = useState<boolean>(true);

  return (
    <Box
      className="featured-slider slider-wrapper"
      data-testid="featured-slider"
      sx={featuredSliderStyles}
    >
      <Swiper
        modules={[Thumbs, Pagination, EffectCoverflow]}
        slidesPerView={"auto"}
        // spaceBetween={16}
        grabCursor={true}
        centeredSlides={true}
        effect={"coverflow"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
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
        ref={swiperElRef}
      >
        {section.cards?.map((card) => {
          const image = card.card_image || card.main_image;
          return (
            <SwiperSlide key={card.id}>
              <Link
                href={card.url}
                color="primary"
                underline="always"
                className="card-wrapper"
              >
                {!!image && (
                  <LazyPicture
                    image={{
                      ...image,
                      description: image.description || card.title,
                    }}
                    imageProps={{
                      "data-swiper-material-scale": 1.5,
                      "data-swiper-material-slide-size": "100%",
                    }}
                  ></LazyPicture>
                )}

                {!!card.description && (
                  <Box
                    className="slide-label swiper-material-animate-opacity"
                    dangerouslySetInnerHTML={{ __html: card.description }}
                  ></Box>
                )}
              </Link>
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
