import { swiperStyles } from "@components/swiper/swiperStyles";
import { SxProps, Theme } from "@mui/material";

export const sectionArticlesCarouselStyles: SxProps<Theme> = [
  swiperStyles,

  {
    "&.section": {
      gap: "0",

      '.section-title': {
        marginBottom: '32px'
      }
    },

    ".slider-wrapper": {
      marginTop: '16px',
      marginBottom: '16px',
    },

    ".swiper-slide.swiper-slide": {
      display: "inline-block",
      width: "300px",
      maxWidth: "100%",
    },

    ".section-actions": {
      marginTop: "8px",
    }
  },
];
