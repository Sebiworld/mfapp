import { Components, Theme } from "@mui/material/styles";

declare module "@mui/material/LinearProgress" {
  interface LinearProgressPropsColorOverrides {
    light: true;
    dark: true;
    contrast: true;
    projectPrimary: true;
  }
}

export const MuiLinearProgressOverwrites: Components<Theme> = {
  MuiLinearProgress: {
    styleOverrides: {
      root: {},
    },
  },
};
