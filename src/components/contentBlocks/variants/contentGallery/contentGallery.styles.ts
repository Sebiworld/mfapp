import { swiperStyles } from "@components/swiper/swiperStyles";
import { SxProps, Theme } from "@mui/material";

export const contentGalleryStyles: SxProps<Theme> = (theme) => ({
  "&.content-block": {
    width: "100%",
  },

  ".gallery-container": {
    position: "relative",
    paddingY: "32px",

    ".gallery-element": {
      height: "800px",
    },

    "&.content-gallery-grid": {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, 260px)",
      gap: "8px",
    },

    "&.content-gallery-slider": {
      ".slider-outer-wrapper": {
        display: "flex",
        position: "relative",

        "&::before": {
          content: "''",
          float: "left",
          paddingBottom: "56.25%",
        },
      },

      ".slider-wrapper": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        marginLeft: 0,
        marginRight: 0,
        // padding: "0 24px",

        ...swiperStyles,

        // ".swiper-container.swiper-container": {
        //   paddingLeft: 0,
        //   paddingRight: 0,

        //   ".swiper-button-prev": {
        //     [theme.breakpoints.up("md")]: {
        //       left: 0,
        //     },
        //   },

        //   ".swiper-button-next": {
        //     [theme.breakpoints.up("md")]: {
        //       right: 0,
        //     },
        //   },
        // },
      },
    },
  },
});
