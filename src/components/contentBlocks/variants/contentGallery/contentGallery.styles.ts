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
      gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
      gap: "8px",

      [theme.breakpoints.up("sm")]: {
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      },

      [theme.breakpoints.up("lg")]: {
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      },

      ".image-button": {
        display: "block",
      },
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
        alignItems: "center",
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
