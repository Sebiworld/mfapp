import { Components, Theme } from "@mui/material/styles";

declare module "@mui/material/Tabs" {
  interface TabsPropsIndicatorColorOverrides {
    light: true;
    dark: true;
    contrast: true;
    projectPrimary: true;
  }

  interface TabsPropsTextColorOverrides {
    light: true;
    dark: true;
    contrast: true;
    projectPrimary: true;
  }
}

export const MuiTabsOverwrites: Components<Theme> = {
  MuiTabs: {
    styleOverrides: {
      root: {
        ".MuiTabs-list": {
          ".MuiTab-root": {
            textTransform: "none",
          },
        },
      },
    },
  },
};
