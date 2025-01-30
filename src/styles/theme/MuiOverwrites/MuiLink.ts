import { Components, Theme } from "@mui/material/styles";

export const MuiLinkOverwrites: Components<Theme> = {
  MuiLink: {
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        ...(ownerState.underline === "always" && {
          "&:not(:hover)": {
            color: theme.palette.text.primary,
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
        }),
      }),
    },
  },
};
