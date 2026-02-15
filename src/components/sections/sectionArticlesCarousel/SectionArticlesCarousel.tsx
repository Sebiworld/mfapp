import { ContentBlocks } from "@components/contentBlocks/ContentBlocks";
import { Box, Button, Typography } from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import { sectionArticlesCarouselStyles } from "./sectionArticlesCarousel.styles";
import { SectionArticlesCarouselDto } from "@models/section/section-articles-carousel-dto.model";
import { PageCard } from "@components/pageCard/PageCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Import Swiper styles
import "swiper/css/bundle";
import { isValidArray } from "@utils/functions/isValidArray";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Alerts } from "@components/alerts/Alerts";
import { Link } from "react-router";

export interface SectionArticlesCarouselProps {
  section: SectionArticlesCarouselDto;
}

export const SectionArticlesCarousel: React.FC<
  SectionArticlesCarouselProps
> = ({ section }) => {
  const { t } = useTranslation();
  const swiperElRef = useRef<SwiperRef | null>(null);
  const [allowSlidePrev, setAllowSlidePrev] = useState<boolean>(true);
  const [allowSlideNext, setAllowSlideNext] = useState<boolean>(true);

  const classes = useMemo(() => {
    const output = ["section", `section-${section.type}`];

    if (section.classes && typeof section.classes === "string") {
      output.push(...section.classes.split(" "));
    }

    return output.join(" ");
  }, [section]);

  if (!isValidArray(section.items) || !section.items.length) {
    return null;
  }

  return (
    <Box
      component="section"
      id={section.section_name}
      className={classes}
      sx={sectionArticlesCarouselStyles}
    >
      {section?.alerts && <Alerts alerts={section?.alerts}></Alerts>}

      {section.title && !section.hide_title && (
        <Typography variant="h2" className="section-title">
          {section.title}
        </Typography>
      )}

      <ContentBlocks blocks={section.contents}></ContentBlocks>

      <Box className="slider-wrapper">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={16}
          centeredSlides={false}
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
          {section.items.map((item) => (
            <SwiperSlide key={item.id}>
              <PageCard card={item}></PageCard>
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

      {section.articles_page_url && (
        <Box className="section-actions">
          <Button
            variant="contained"
            color="projectPrimary"
            component={Link}
            to={section.articles_page_url}
            className="all-articles-button"
          >
            {t("news.see-all")}
          </Button>
        </Box>
      )}
    </Box>
  );
};
