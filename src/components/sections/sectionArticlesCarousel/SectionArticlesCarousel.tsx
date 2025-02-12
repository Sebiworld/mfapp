import { ContentBlocks } from "@components/contentBlocks/ContentBlocks";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { sectionArticlesCarouselStyles } from "./sectionArticlesCarousel.styles";
import { SectionArticlesCarouselDto } from "@models/section/section-articles-carousel-dto.model";
import { register, SwiperContainer } from "swiper/element";
import { SwiperOptions } from "swiper/types";
import { PageCard } from "@components/pageCard/PageCard";

export interface SectionArticlesCarouselProps {
  section: SectionArticlesCarouselDto;
}

export const SectionArticlesCarousel: React.FC<
  SectionArticlesCarouselProps
> = ({ section }) => {
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
      centeredSlides: false,
      navigation: true,
      // effect: "coverflow",
      // modules: [Scrollbar, Thumbs],
      scrollbar: {
        hide: false,
      },
      coverflowEffect: {
        // scale: 2,
      },
      // injectStylesUrls: ['swiper/modules/scrollbar.min.css'],
    };
    Object.assign(swiperContainer, params);

    // swiperContainer.addEventListener("swiperinit", onSwiperInit);

    swiperContainer.initialize();

    return () => {
      // swiperContainer.removeEventListener("swiperinit", onSwiperInit);
    };
  }, []);

  return (
    <Box
      component="section"
      id={section.section_name}
      className="section section-articles-carousel"
      sx={sectionArticlesCarouselStyles}
    >
      {section.title && !section.hide_title && (
        <Typography variant="h2" className="section-title">
          {section.title}
        </Typography>
      )}

      <ContentBlocks blocks={section.contents}></ContentBlocks>

      <Box className="slider-wrapper">
        <swiper-container ref={swiperElRef} init="false">
          {section.items.map((item) => (
            <swiper-slide key={item.id}>
              <PageCard card={item}></PageCard>
            </swiper-slide>
          ))}
        </swiper-container>
      </Box>
    </Box>
  );
};
