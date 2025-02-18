import { SxProps, Theme } from "@mui/material";

export const pageCardStyles: SxProps<Theme> = theme => ({
  ".card-content": {
    marginTop: "4px",
    marginBottom: "8px",

    ".card-title": {
      "&.subtle": {
        fontWeight: "normal",
        fontStyle: "italic",
        fontSize: theme.vars.font.bodyXS,
        opacity: '0.7'
      },
    },
  },
});
