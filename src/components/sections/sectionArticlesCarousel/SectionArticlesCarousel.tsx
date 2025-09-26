import { ContentBlocks } from "@components/contentBlocks/ContentBlocks";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { sectionArticlesCarouselStyles } from "./sectionArticlesCarousel.styles";
import { SectionArticlesCarouselDto } from "@models/section/section-articles-carousel-dto.model";
import { register, SwiperContainer } from "swiper/element/bundle";
import { SwiperOptions } from "swiper/types";
import { PageCard } from "@components/pageCard/PageCard";

// Import Swiper styles
import "swiper/css/bundle";
import { isValidArray } from "@utils/functions/isValidArray";
import { useTranslation } from "react-i18next";
import { SwiperContainerElement } from "@utils/components/SwiperContainerElement";
import { SwiperSlideElement } from "@utils/components/SwiperSlideElement";

export interface SectionArticlesCarouselProps {
  section: SectionArticlesCarouselDto;
}

export const SectionArticlesCarousel: React.FC<
  SectionArticlesCarouselProps
> = ({ section }) => {
  const { t } = useTranslation();
  const swiperElRef = useRef<SwiperContainer | null>(null);

  useEffect(() => {
    if (!swiperElRef?.current) {
      return;
    }
    register();

    const swiperContainer = swiperElRef.current as SwiperContainer;

    const params: SwiperOptions = {
      slidesPerView: "auto",
      spaceBetween: 16,
      centeredSlides: false,
      navigation: true,
    };
    Object.assign(swiperContainer, params);

    swiperContainer.initialize();
  }, []);

  if (!isValidArray(section.items) || !section.items.length) {
    return null;
  }

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
        <SwiperContainerElement ref={swiperElRef} init="false">
          {section.items.map((item) => (
            <SwiperSlideElement key={item.id}>
              <PageCard card={item}></PageCard>
            </SwiperSlideElement>
          ))}
        </SwiperContainerElement>
      </Box>

      {section.articles_page_url && (
        <Box className="section-actions">
          <Button
            variant="contained"
            color="secondary"
            href={section.articles_page_url}
            className="all-articles-button"
          >
            {t("news.see-all")}
          </Button>
        </Box>
      )}
    </Box>
  );
};
