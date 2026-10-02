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
    // Lets the hero image derive its height from its own width (`cqw`).
    containerType: "inline-size",
  },

  // From `lg` the image box has an explicit height, so a limit set by the page (`--hero-max-height`) can be
  // animated; the image is cropped to it. Without a ratio the height stays that of the image.
  ".hero-image": {
    [theme.breakpoints.up("lg")]: {
      "--hero-natural-height": "calc(100cqw / var(--hero-ratio))",
      height:
        "min(var(--hero-natural-height), var(--hero-max-height, var(--hero-natural-height)))",
      overflow: "hidden",
      transition: "height 300ms cubic-bezier(0.23, 1, 0.32, 1)",

      ".lazy-picture, picture": {
        height: "100%",
      },

      img: {
        height: "100%",
        objectFit: "cover",
      },

      "@media (prefers-reduced-motion: reduce)": {
        transition: "none",
      },
    },
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
