import { SxProps, Theme } from "@mui/material";

export const swiperStyles: SxProps<Theme> = {
  "swiper-container": {
    // paddingX: '64px',
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

    "&::part(button-prev), &::part(button-next)": {
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      padding: "8px",
    },

    "&::part(wrapper)": {
      // marginBottom: '60px'
    },

    "&::part(button-prev)": {
      left: 0,
    },
    "&::part(button-next)": {
      right: 0,
    },

    "&::part(scrollbar)": {
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

    "&::part(pagination)": {
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
