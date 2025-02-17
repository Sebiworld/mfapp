import { swiperStyles } from "@components/swiper/swiperStyles";
import { SxProps, Theme } from "@mui/material";

export const sectionArticlesCarouselStyles: SxProps<Theme> = {
  ...swiperStyles,

  "swiper-slide": {
    width: "300px",
    maxWidth: "100%",
  },
};
