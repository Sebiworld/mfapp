import React, { useCallback, useRef, useState } from "react";

// Import Swiper React components
import { Thumbs, Pagination } from "swiper/modules";
import EffectCarousel from "../../../swiper/effects/effect-carousel.esm";
import CloseIcon from "@mui/icons-material/Close";
// Import Swiper styles
import "swiper/css/bundle";

import { SectionPagesGridDto } from "@models/section/section-pages-grid-dto.model";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import {
  featuredSliderModalStyles,
  featuredSliderStyles,
} from "./featuredSlider.styles";
import {
  Box,
  Button,
  IconButton,
  Link,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTranslation } from "react-i18next";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";

export interface FeaturedSliderProps {
  section: SectionPagesGridDto;
}

export const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ section }) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const swiperElRef = useRef<SwiperRef | null>(null);
  const [allowSlidePrev, setAllowSlidePrev] = useState<boolean>(true);
  const [allowSlideNext, setAllowSlideNext] = useState<boolean>(true);

  return (
    <>
      <Box
        className="featured-slider slider-wrapper"
        data-testid="featured-slider"
        sx={featuredSliderStyles}
      >
        <Swiper
          modules={[Thumbs, Pagination, EffectCarousel]}
          slidesPerView={"auto"}
          // spaceBetween={16}
          grabCursor={true}
          centeredSlides={true}
          effect={"carousel"}
          // @ts-expect-error - carouselEffect is a custom prop provided by the EffectCarousel module
          carouseleffect={{
            // opacity change per side slide
            opacityStep: 0.5,
            // scale change per side slide
            scaleStep: 0.8,
            // amount of side slides visible, can be 1, 2 or 3
            sideSlides: 3,
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

                  {!!(card.description || card.info_overlay) && (
                    <Box className="slide-label swiper-material-animate-opacity">
                      {!!card.description && (
                        <Box
                          className="description"
                          dangerouslySetInnerHTML={{ __html: card.description }}
                        />
                      )}

                      {!!card.info_overlay && (
                        <Box
                          className="info_overlay"
                          dangerouslySetInnerHTML={{
                            __html: card.info_overlay,
                          }}
                        />
                      )}
                    </Box>
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

      <Box className="actions-container">
        <Button
          variant="contained"
          color="projectPrimary"
          onClick={() => setIsOpen(true)}
        >
          Alle ansehen
        </Button>
      </Box>

      <Modal
        className="section-featured-slider-modal"
        data-testid="section-featured-slider-modal"
        open={isOpen}
        onClose={onClose}
        sx={featuredSliderModalStyles}
      >
        <Paper className="modal-container" variant="outlined">
          <Box className="modal-header">
            <Box className="title"></Box>

            <Box className="actions">
              <IconButton
                title={t("general.actions.close")}
                onClick={onClose}
                className="close-button"
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          <Box className="modal-content">
            <Timeline position="right">
              {section.cards?.map((card) => {
                const image = card.card_image || card.main_image;

                return (
                  <TimelineItem key={card.id}>
                    {!!card.info_overlay && (
                      <TimelineOppositeContent
                        color="text.secondary"
                        dangerouslySetInnerHTML={{ __html: card.info_overlay }}
                      ></TimelineOppositeContent>
                    )}

                    <TimelineSeparator>
                      <TimelineConnector />

                      <TimelineDot color="primary" variant="outlined">
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
                            sizes={[{ width: 120 }]}
                          ></LazyPicture>
                        )}
                      </TimelineDot>

                      <TimelineConnector />
                    </TimelineSeparator>

                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      {card.title && (
                        <Typography
                          variant="h6"
                          className="title"
                          component="span"
                          dangerouslySetInnerHTML={{ __html: card.title }}
                        ></Typography>
                      )}

                      {card.description && (
                        <Box
                          className="description"
                          dangerouslySetInnerHTML={{ __html: card.description }}
                        ></Box>
                      )}

                      <Button
                        href={card.url}
                        color="contrast"
                        variant="contained"
                        size="small"
                      >
                        Mehr dazu...
                      </Button>
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
            </Timeline>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};
