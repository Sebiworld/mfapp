import { Components, Theme } from "@mui/material/styles";

export const MuiLinkOverwrites: Components<Theme> = {
  MuiLink: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...(ownerState.underline === "always" && {
          "&:not(:hover)": {
            color: "inherit",
          },

          "&:hover": {
            backgroundColor: "transparent",
          },
        }),
      }),
    },
  },
};
