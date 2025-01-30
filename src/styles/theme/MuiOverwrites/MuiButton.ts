import { Components, Theme } from "@mui/material/styles";

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    light: true;
    dark: true;
    contrast: true;
    projectPrimary: true;
  }
}

export const MuiButtonOverwrites: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: {
        fontWeight: "bold",
        textTransform: "none",
      },
    },
  },

  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: "4px",
      },
    },
  },
};
