import { Components, Theme } from "@mui/material/styles";

declare module "@mui/material/Snackbar" {
  // 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'dark' | 'medium' | 'light' | 'lighter' | 'transparent';
  interface MuiSnackbarPropsColorOverrides {
    primary: true;
    secondary: true;
    tertiary: true;
    success: true;
    warning: true;
    danger: true;
    light: true;
    medium: true;
    dark: true;
    lighter: true;
    transparent: true;
    bg: true;
    contrast: true;
    projectPrimary: true;
  }
}

export const MuiSnackbarOverwrites: Components<Theme> = {
  MuiSnackbar: {
    styleOverrides: {
      root: {
        ".MuiSnackbarContent-action": {
          gap: "8px",
          marginTop: "12px",
          marginLeft: 0,
          paddingLeft: 0,
          width: "100%",
          flexWrap: "wrap",

          ".spacer": {
            flexGrow: 1,
          },
        },
      },
    },
  },
};
