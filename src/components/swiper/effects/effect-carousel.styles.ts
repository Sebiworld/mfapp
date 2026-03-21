import { Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

export const effectCarouselStyles: SystemStyleObject<Theme> = {
  ".swiper-carousel": {
    position: "relative",
    margin: "0 auto",
    maxWidth: "100%",
    overflow: "hidden",

    ".swiper-slide, swiper-slide": {
      position: "relative",
    },
  },
};
