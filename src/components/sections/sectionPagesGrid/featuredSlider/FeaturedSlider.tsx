import { Box } from "@mui/joy";
import React, { useEffect, useRef } from "react";

// Import Swiper React components
import { SwiperContainer, register } from "swiper/element/bundle";
import { Scrollbar, Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css/bundle";

import { SectionPagesGridDto } from "@models/section/section-pages-grid-dto.model";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
// import EffectMaterial from '@components/swiper/effects/effect-material.esm';
import { SwiperOptions } from "swiper/types";
import { featuredSliderStyles } from "./featuredSlider.styles";

export interface FeaturedSliderProps {
  section: SectionPagesGridDto;
}

export const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ section }) => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    console.log("FeaturedSlider", section);
  }, [section]);

  const onSwiperInit = (e: Event) => {
    console.log("onSwiperInit", e);
  };

  useEffect(() => {
    if (!swiperElRef?.current) {
      return;
    }
    register();

    const swiperContainer = swiperElRef.current as SwiperContainer;

    const params: SwiperOptions = {
      slidesPerView: 3,
      spaceBetween: 16,
      centeredSlides: true,
      navigation: true,
      effect: "coverflow",
      modules: [Scrollbar, Thumbs],
      scrollbar: {
        hide: false,
      },
      coverflowEffect: {
        // scale: 2,
      },
      // injectStylesUrls: ['swiper/modules/scrollbar.min.css'],
    };
    Object.assign(swiperContainer, params);

    swiperContainer.addEventListener("swiperinit", onSwiperInit);

    swiperContainer.initialize();

    return () => {
      swiperContainer.removeEventListener("swiperinit", onSwiperInit);
    };
  }, []);

  return (
    <Box
      className="featured-slider"
      data-testid="featured-slider"
      sx={featuredSliderStyles}
    >
      <swiper-container ref={swiperElRef} init="false">
        {section.cards?.map((card) => (
          <swiper-slide key={card.id}>
            {!!card?.main_image && (
              <LazyPicture
                image={card.main_image}
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
          </swiper-slide>
        ))}
      </swiper-container>
    </Box>
  );
};
