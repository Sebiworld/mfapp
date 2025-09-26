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

    "swiper-slide": {
      display: "inline-block",
      width: "300px",
      maxWidth: "100%",
    },
  },
];
