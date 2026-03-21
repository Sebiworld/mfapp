import { SxProps, Theme } from "@mui/material";

export const pageCardStyles: SxProps<Theme> = (theme) => ({
  display: "flex",
  flexDirection: "column",

  ".card-content": {
    marginTop: "4px",
    marginBottom: "8px",
    flex: "1 1 100px",

    ".card-title": {
      "&.subtle": {
        fontWeight: "normal",
        fontStyle: "italic",
        fontSize: theme.vars.font.bodyXS,
        opacity: "0.7",
      },
    },

    ".card-intro": {
      textOverflow: "ellipsis",
      overflow: "hidden",
      display: "-webkit-box",
      // whiteSpace: "nowrap",
      lineClamp: "3",
      boxOrient: "vertical",
      WebkitLineClamp: "3",
      WebkitBoxOrient: "vertical",
    },
  },
});
