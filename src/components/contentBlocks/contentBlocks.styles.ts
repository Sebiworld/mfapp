import { SxProps, Theme } from "@mui/material";
import { gridLayoutStyles } from "@styles/utils/gridLayout.styles";

export const contentBlocksStyles: SxProps<Theme> = [
  gridLayoutStyles,
  (theme) => ({
    ".content-block": {
      display: "flex",
      flexDirection: "column",
      maxWidth: "100%",

      "&.content-form": {
        gridColumnEnd: "span 12",

        [theme.breakpoints.down("md")]: {
          gridColumn: "span 6",
        },
      },

      "&.content-text": {},
    },
  }),
];
