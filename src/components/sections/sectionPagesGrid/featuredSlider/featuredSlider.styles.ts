import { effectCarouselStyles } from "@components/swiper/effects/effect-carousel.styles";
import { swiperStyles } from "@components/swiper/swiperStyles";
import { SxProps, Theme } from "@mui/material";

export const featuredSliderStyles: SxProps<Theme> = [
  swiperStyles,
  effectCarouselStyles,

  (theme) => ({
    // width: "1000px",
    maxWidth: "100%",
    margin: "0 auto",

    ".card-wrapper": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    ".lazy-picture img": {
      maxHeight: "400px",
    },

    "&.featured-slider swiper-container": {
      marginLeft: "0",
      marginRight: "0",
      paddingLeft: "0",
      paddingRight: "0",

      "&::part(button-prev)": {
        left: "0",
      },
      "&::part(button-next)": {
        right: "0",
      },
    },

    ".swiper": {
      width: "100%",
      paddingTop: "24px",
      paddingBottom: "24px",

      [theme.breakpoints.down("md")]: {
        paddingTop: "0",
        paddingBottom: "0",
      },
    },

    ".swiper-slide": {
      backgroundPosition: "center",
      backgroundSize: "cover",
      width: "300px",
      height: "300px",

      img: {
        display: "block",
        width: "100%",
      },
    },
  }),
];
