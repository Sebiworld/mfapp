import { Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

export const swiperStyles: SystemStyleObject<Theme> = {
  ".slider-wrapper, &.slider-wrapper": {
    position: "relative",
    marginLeft: "-24px",
    marginRight: "-24px",
    paddingLeft: "24px",
    paddingRight: "24px",

    ".swiper-action": {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 10,
      backgroundColor: "rgba(var(--mf-palette-contrast-mainChannel) / 0.15)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      padding: "8px",

      "&:hover, &:focus": {
        background: "rgba(var(--mf-palette-contrast-mainChannel) / 0.20)",
      },

      "&.action-prev": {
        left: "0",
      },

      "&.action-next": {
        right: "0",
      },
    },
  },

  ".swiper": {
    position: "relative",

    "--swiper-navigation-size": "32px",
    "--swiper-navigation-sides-offset": "80px",
    "--swiper-navigation-color": "var(--mf-palette-contrast-500)",

    "--swiper-scrollbar-bg-color":
      "rgba(var(--mf-palette-contrast-mainChannel) / 0.15)",
    "--swiper-scrollbar-drag-bg-color": "var(--mf-palette-contrast-500)",
    "--swiper-scrollbar-sides-offset": "10%",

    "--swiper-pagination-bullet-inactive-color":
      "var(--mf-palette-contrast-500)",
    "--swiper-pagination-bullet-inactive-opacity": "0.3",
    "--swiper-pagination-color": "var(--mf-palette-contrast-500)",

    "&::part(button-prev), &::part(button-next), .swiper-button-prev, .swiper-button-next":
      {
        backgroundColor: "rgba(var(--mf-palette-contrast-mainChannel) / 0.15)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        padding: "8px",
      },

    "&::part(wrapper), .swiper-wrapper": {
      // marginBottom: '60px'
      // alignItems: "center",
    },

    "&::part(container), .swiper-container": {
      position: "unset",
    },

    "&::slotted(swiper-slide), .swiper-slide": {
      textAlign: "center",
    },

    "&::part(button-prev), .swiper-button-prev": {
      left: "0",

      "&:hover, &:focus": {
        background: "rgba(var(--mf-palette-contrast-mainChannel) / 0.25)",
      },
    },

    "&::part(button-next), .swiper-button-next": {
      right: "0",

      "&:hover, &:focus": {
        background: "rgba(var(--mf-palette-contrast-mainChannel) / 0.25)",
      },
    },

    "&::part(scrollbar), .swiper-scrollbar": {
      // width: '300px',
      // maxWidth: '100%',
      // margin: '0 auto',
      position: "relative",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      marginTop: "40px",
      marginLeft: "auto",
      marginRight: "auto",
    },

    "&::part(pagination), .swiper-pagination": {
      // width: '300px',
      // maxWidth: '100%',
      // margin: '0 auto',
      position: "relative",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      marginTop: "40px",
      marginLeft: "auto",
      marginRight: "auto",
    },

    // "&.swiper-watch-progress": {
    //   marginBottom: "50px",
    // },
  },
};
