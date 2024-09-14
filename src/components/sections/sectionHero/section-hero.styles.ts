import { SxProps } from "@mui/material";

export const sectionHeroStyles: SxProps = {
  position: "relative",

  "&.section": {
    padding: "0",
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
};
