import { Components, Theme } from "@mui/material/styles";

declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    light: true;
    dark: true;
    contrast: true;
    projectPrimary: true;
  }
}

declare module "@mui/material/Toolbar" {
  interface ToolbarPropsColorOverrides {
    light: true;
    dark: true;
    contrast: true;
    projectPrimary: true;
  }
}

export const MuiToolbarOverwrites: Components<Theme> = {
  MuiToolbar: {

  }
};
