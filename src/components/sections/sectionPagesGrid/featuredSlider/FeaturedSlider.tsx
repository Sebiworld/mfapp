import React, { useEffect, useRef } from "react";

// Import Swiper React components
import { SwiperContainer, register } from "swiper/element/bundle";
import { Thumbs, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css/bundle";

import { SectionPagesGridDto } from "@models/section/section-pages-grid-dto.model";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { SwiperOptions } from "swiper/types";
import { featuredSliderStyles } from "./featuredSlider.styles";
import { Box, Link } from "@mui/material";
import { SwiperContainerElement } from "@utils/components/SwiperContainerElement";
import { SwiperSlideElement } from "@utils/components/SwiperSlideElement";

export interface FeaturedSliderProps {
  section: SectionPagesGridDto;
}

export const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ section }) => {
  const swiperElRef = useRef(null);

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
      modules: [Thumbs, Pagination],
      pagination: {
        clickable: true,
      },
      coverflowEffect: {
        // scale: 2,
      },
    };
    Object.assign(swiperContainer, params);

    swiperContainer.initialize();
  }, []);

  return (
    <Box
      className="featured-slider"
      data-testid="featured-slider"
      sx={featuredSliderStyles}
    >
      <SwiperContainerElement ref={swiperElRef} init="false">
        {section.cards?.map((card) => {
          const image = card.card_image || card.main_image;
          return (
            <SwiperSlideElement key={card.id}>
              <Link
                href={card.url}
                color="primary"
                underline="always"
                className="card-wrapper"
              >
                {!!image && (
                  <LazyPicture
                    image={image}
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
            </SwiperSlideElement>
          );
        })}
      </SwiperContainerElement>
    </Box>
  );
};
