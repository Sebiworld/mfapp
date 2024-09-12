import { ContentBlocks } from '@components/contentBlocks/ContentBlocks';
import { Box, Typography } from '@mui/joy';
import React, { useEffect, useRef } from 'react';

// Import Swiper React components
import { SwiperContainer, register } from 'swiper/element/bundle';
import { Scrollbar, Thumbs } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css/bundle';

import { SectionPagesGridDto } from '@models/section/section-pages-grid-dto.model';
import { LazyPicture } from '@components/lazyPicture/LazyPicture';
import { sectionPagesGridStyles } from './sectionPagesGrid.styles';
// import EffectMaterial from '@components/swiper/effects/effect-material.esm';
import { SwiperOptions } from 'swiper/types';

export interface SectionPagesGridProps {
  section: SectionPagesGridDto;
}

export const SectionPagesGrid: React.FC<SectionPagesGridProps> = ({ section }) => {
  // console.log('SectionPagesGrid', section);

  const swiperElRef = useRef(null);

  const onSwiperInit = (e: Event) => {
    // console.log("onSwiperInit", e);
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
      scrollbar: true,
      navigation: true,
      effect: 'coverflow',
      modules: [Scrollbar, Thumbs],
      coverflowEffect: {
        // scale: 2,
      },
      // injectStylesUrls: ['swiper/modules/scrollbar.min.css'],
    };
    Object.assign(swiperContainer, params);

    swiperContainer.addEventListener('swiperinit', onSwiperInit);

    swiperContainer.initialize();

    return () => {
      swiperContainer.removeEventListener('swiperinit', onSwiperInit);
    };
  }, []);

  return (
    <Box
      component="section"
      id={section.section_name}
      className="section section-pages-grid"
      sx={sectionPagesGridStyles}
    >
      {section.title && !section.hide_title && <Typography level="h2">{section.title}</Typography>}
      <ContentBlocks blocks={section.contents}></ContentBlocks>

      <Box className="slider-wrapper">
        {/* <Swiper
          modules={[EffectMaterial]}
          effect="material"
          centeredSlides={true}
          spaceBetween={16}
          slidesPerView={3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        > */}
        <swiper-container ref={swiperElRef} init="false">
          {section.pages?.map((page) => (
            <swiper-slide key={page.id}>
              {!!page?.image && (
                <LazyPicture
                  image={page.image}
                  imageProps={{
                    'data-swiper-material-scale': 1.5,
                    'data-swiper-material-slide-size': '100%',
                  }}
                ></LazyPicture>
              )}
              {!!page.description && (
                <Box
                  className="slide-label swiper-material-animate-opacity"
                  dangerouslySetInnerHTML={{ __html: page.description }}
                ></Box>
              )}
            </swiper-slide>
          ))}
          {/* </Swiper> */}
        </swiper-container>
      </Box>
    </Box>
  );
};
