import { swiperStyles } from "@components/swiper/swiperStyles";
import { SxProps } from "@mui/joy/styles/types";

export const featuredSliderStyles: SxProps = {
  ...swiperStyles,
  width: "1000px",
  maxWidth: "100%",
  margin: "0 auto",

  ".lazy-picture img": {
    maxHeight: "400px",
  },
};
