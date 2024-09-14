import { SxProps } from "@mui/joy/styles/types";

export const swiperStyles: SxProps = {
  "swiper-container": {
    // paddingX: '64px',
    "--swiper-navigation-size": "32px",
    "--swiper-navigation-sides-offset": "80px",
    "--swiper-navigation-color": "var(--joy-palette-contrast-800)",
    "--swiper-scrollbar-bg-color": "var(--joy-palette-contrast-200)",
    "--swiper-scrollbar-drag-bg-color": "var(--joy-palette-contrast-800)",
    "--swiper-scrollbar-sides-offset": "10%",

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
      // background:
    },

    // "&.swiper-watch-progress": {
    //   marginBottom: "50px",
    // },
  },
};
