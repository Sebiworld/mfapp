import { Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

export const gridLayoutStyles: (theme: Theme) => SystemStyleObject<Theme> = (
  theme
) => ({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gridAutoFlow: "dense",
  width: "100%",
  gap: "32px",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(6, 1fr)",
  },

  ".layout-block": {
    position: "relative",
    textAlign: "left",
    gridColumnEnd: "span 12",

    [theme.breakpoints.down("md")]: {
      gridColumnEnd: "span 6",
    },

    "&.block-depth-1": {
      gridColumnEnd: "span 6",
    },

    "&.block-depth-2": {
      gridColumnEnd: "span 3",
    },

    "&.width-1.width-1": {
      gridColumnEnd: "span 1",
    },

    "&.width-2.width-2": {
      gridColumnEnd: "span 2",
    },

    "&.width-3.width-3": {
      gridColumnEnd: "span 3",
    },

    "&.width-4.width-4": {
      gridColumnEnd: "span 4",
    },

    "&.width-5.width-5": {
      gridColumnEnd: "span 5",
    },

    "&.width-6.width-6": {
      gridColumnEnd: "span 6",
    },

    "&.width-7.width-7": {
      gridColumnEnd: "span 7",
    },

    "&.width-8.width-8": {
      gridColumnEnd: "span 8",
    },

    "&.width-9.width-9": {
      gridColumnEnd: "span 9",
    },

    "&.width-10.width-10": {
      gridColumnEnd: "span 10",
    },

    "&.width-11.width-11": {
      gridColumnEnd: "span 11",
    },

    "&.width-12.width-12": {
      gridColumnEnd: "span 12",
    },

    "&.center": {
      textAlign: "center",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
});
