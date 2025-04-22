import { SxProps, Theme } from "@mui/material";

export const contentBlocksStyles: SxProps<Theme> = (theme) => ({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gridAutoFlow: "dense",
  width: "100%",
  gap: "32px",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(6, 1fr)",
  },

  ".content-block": {
    position: "relative",
    textAlign: "left",
    gridColumnEnd: "span 12",

    [theme.breakpoints.down("md")]: {
      gridColumnEnd: "span 6",
    },

    "&.depth-1": {
      gridColumnEnd: "span 6",
    },

    "&.depth-2": {
      gridColumnEnd: "span 3",
    },

    "&.content-form": {
      gridColumnEnd: "span 12",
    },

    "&.center": {
      textAlign: "center",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
});
