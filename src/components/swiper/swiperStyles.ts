import { SxProps, Theme } from "@mui/material";

export const swiperStyles: SxProps<Theme> = {
  "swiper-container": (theme) => ({
    marginLeft: "-24px",
    marginRight: "-24px",
    paddingLeft: "24px",
    paddingRight: "24px",
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

    "&::part(button-prev), &::part(button-next)": {
      backgroundColor: "rgba(var(--mf-palette-contrast-mainChannel) / 0.15)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      padding: "8px",
    },

    "&::part(wrapper)": {
      // marginBottom: '60px'
    },

    "&::part(container)": {
      position: "unset",
    },

    "&::part(button-prev)": {
      left: "0",

      [theme.breakpoints.up("md")]: {
        left: "-24px",
      },

      "&:hover, &:focus": {
        background: "rgba(var(--mf-palette-contrast-mainChannel) / 0.25)",
      },
    },

    "&::part(button-next)": {
      right: "0",

      [theme.breakpoints.up("md")]: {
        right: "-24px",
      },

      "&:hover, &:focus": {
        background: "rgba(var(--mf-palette-contrast-mainChannel) / 0.25)",
      },
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
  }),
};
