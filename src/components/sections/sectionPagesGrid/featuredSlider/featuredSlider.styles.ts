import { effectCarouselStyles } from "@components/swiper/effects/effect-carousel.styles";
import { swiperStyles } from "@components/swiper/swiperStyles";
import { SxProps, Theme } from "@mui/material";

export const featuredSliderStyles: SxProps<Theme> = [
  swiperStyles,
  effectCarouselStyles,

  (theme) => ({
    width: "850px",
    maxWidth: "100%",
    margin: "0 auto",

    "&.slider-wrapper": {
      marginLeft: "0",
      marginRight: "0",
    },

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

export const featuredSliderActionsContainerStyles: SxProps<Theme> = {
  width: "850px",
  maxWidth: "100%",
};

export const featuredSliderModalStyles: SxProps<Theme> = {
  ".MuiTimeline-root": {
    padding: 0,
  },

  ".MuiTimelineOppositeContent-root, .MuiTimelineContent-root": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    minHeight: "120px",
    lineHeight: "1.4",

    ".MuiTypography-root": {
      lineHeight: "1.2",
    },

    ".MuiButtonBase-root": {
      marginTop: "8px",
    },
  },

  ".MuiTimelineDot-root": {
    padding: 0,

    "&>.lazy-picture": {
      width: "60px",
      height: "60px",
      overflow: "hidden",
      borderRadius: "50%",
    },
  },
};
