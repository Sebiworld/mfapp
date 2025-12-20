import { swiperStyles } from "@components/swiper/swiperStyles";
import { SxProps, Theme } from "@mui/material";

export const contentGalleryStyles: SxProps<Theme> = [
  swiperStyles,

  (theme) => ({
    "&.content-block": {
      width: "100%",
    },

    "&.gallery-type-slider": {
      [theme.breakpoints.up("sm")]: {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },

    ".gallery-container": {
      position: "relative",
      paddingY: "32px",

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
        ".slider-wrapper": {
          position: "relative",
          overflow: "hidden",
          alignItems: "center",

          // [theme.breakpoints.up("sm")]: {
          //   marginLeft: "-48px",
          //   marginRight: "-48px",
          // },

          "&.featured-slider": {
            width: "850px",
            maxWidth: "100%",
          },

          "&.panorama-slider": {
            width: "100%",
            maxWidth: "100%",
            marginLeft: "0",
            marginRight: "0",
            // overflow: "visible",

            // ".swiper": {
            //   width: "100%",
            //   height: "280px",
            // },

            // ".lazy-picture": {
            //   img: {
            //     width: " 100%",
            //     height: "100%",
            //     objectFit: "cover",
            //     pointerEvents: "none",
            //   },
            // },
          },
        },
      },
    },
  }),
];
