import { SxProps, Theme } from "@mui/material";

export const sectionHeroStyles: SxProps<Theme> = (theme) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "flex-start",
  width: "100%",

  ".image-container": {
    position: "relative",
  },

  ".section-spacer.section-spacer": {
    position: "absolute",
    left: 0,
    bottom: "-16px",
    display: "block",
    height: "auto",
    width: "100%",
    zIndex: "100",
  },

  ".lazy-picture > img": {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    overflowClipMargin: "content-box",
  },

  ".text-contents-container": {
    position: "relative",
    padding: "64px",
    paddingTop: 0,

    ".alerts-container": {
      paddingTop: 0,
      paddingBottom: "16px",
      textAlign: "left",
    },

    [theme.breakpoints.down("md")]: {
      padding: "42px 24px",
      paddingTop: "24px",
    },
  },

  "&.center .text-contents-container .alerts-container": {
    alignItems: "center",
  },
});
