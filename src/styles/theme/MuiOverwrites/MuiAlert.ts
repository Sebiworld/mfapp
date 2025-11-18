import { Components, Theme } from "@mui/material/styles";

declare module "@mui/material/Alert" {
  // 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'dark' | 'medium' | 'light' | 'lighter' | 'transparent';
  interface AlertPropsColorOverrides {
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

export const MuiAlertOverwrites: Components<Theme> = {
  MuiAlert: {
    styleOverrides: {
      root: {
        width: "450px",
        maxWidth: "100%",
        gap: "16px",

        "&.w-600": {
          width: "600px",
        },

        "&.w-850": {
          width: "850px",
        },

        "&.w-1000": {
          width: "1000px",
        },

        ".alert-content": {
          ".alert-title": {
            color: "var(--variant-solidColor)",
          },
          p: {
            color: "var(--variant-solidColor)",
          },
        },

        ".alert-footer": {
          display: "flex",
          flexDirection: "row",
          gap: "4px",
          flexWrap: "wrap",
          marginTop: "8px",
        },

        variants: [
          // Primary
          {
            props: { variant: "standard", color: "primary" },
            style: {
              backgroundColor: "var(--mf-palette-Alert-primaryStandardBg)",
              color: "var(--mf-palette-Alert-primaryStandardColor)",

              ".MuiAlert-icon": {
                color: "var(--mf-palette-Alert-primaryIconColor)",
              },
            },
          },
          {
            props: { variant: "filled", color: "primary" },
            style: {
              backgroundColor: "var(--mf-palette-Alert-primaryFilledBg)",
              color: "var(--mf-palette-Alert-primaryFilledColor)",
            },
          },
          {
            props: { variant: "outlined", color: "primary" },
            style: {
              ".MuiAlert-icon": {
                color: "var(--mf-palette-Alert-primaryIconColor)",
              },
            },
          },

          // Secondary
          {
            props: { variant: "standard", color: "secondary" },
            style: {
              backgroundColor: "var(--mf-palette-Alert-secondaryStandardBg)",
              color: "var(--mf-palette-Alert-secondaryStandardColor)",

              ".MuiAlert-icon": {
                color: "var(--mf-palette-Alert-secondaryIconColor)",
              },
            },
          },
          {
            props: { variant: "filled", color: "secondary" },
            style: {
              backgroundColor: "var(--mf-palette-Alert-secondaryFilledBg)",
              color: "var(--mf-palette-Alert-secondaryFilledColor)",
            },
          },
          {
            props: { variant: "outlined", color: "secondary" },
            style: {
              ".MuiAlert-icon": {
                color: "var(--mf-palette-Alert-secondaryIconColor)",
              },
            },
          },

          // Bg
          {
            props: { variant: "standard", color: "bg" },
            style: {
              backgroundColor: "var(--mf-palette-Alert-bgStandardBg)",
              color: "var(--mf-palette-Alert-bgStandardColor)",

              ".MuiAlert-icon": {
                color: "var(--mf-palette-Alert-bgIconColor)",
              },
            },
          },
          {
            props: { variant: "filled", color: "bg" },
            style: {
              backgroundColor: "var(--mf-palette-Alert-bgFilledBg)",
              color: "var(--mf-palette-Alert-bgFilledColor)",
            },
          },
          {
            props: { variant: "outlined", color: "bg" },
            style: {
              ".MuiAlert-icon": {
                color: "var(--mf-palette-Alert-bgIconColor)",
              },
            },
          },

          // Contrast
          {
            props: { variant: "standard", color: "contrast" },
            style: {
              backgroundColor: "var(--mf-palette-Alert-contrastStandardBg)",
              color: "var(--mf-palette-Alert-contrastStandardColor)",

              ".MuiAlert-icon": {
                color: "var(--mf-palette-Alert-contrastIconColor)",
              },
            },
          },
          {
            props: { variant: "filled", color: "contrast" },
            style: {
              backgroundColor: "var(--mf-palette-Alert-contrastFilledBg)",
              color: "var(--mf-palette-Alert-contrastFilledColor)",
            },
          },
          {
            props: { variant: "outlined", color: "contrast" },
            style: {
              ".MuiAlert-icon": {
                color: "var(--mf-palette-Alert-contrastIconColor)",
              },
            },
          },

          // ProjectPrimary
          {
            props: { variant: "standard", color: "projectPrimary" },
            style: {
              backgroundColor:
                "var(--mf-palette-Alert-projectPrimaryStandardBg)",
              color: "var(--mf-palette-Alert-projectPrimaryStandardColor)",

              ".MuiAlert-icon": {
                color: "var(--mf-palette-Alert-projectPrimaryIconColor)",
              },
            },
          },
          {
            props: { variant: "filled", color: "projectPrimary" },
            style: {
              backgroundColor: "var(--mf-palette-Alert-projectPrimaryFilledBg)",
              color: "var(--mf-palette-Alert-projectPrimaryFilledColor)",
            },
          },
          {
            props: { variant: "outlined", color: "projectPrimary" },
            style: {
              ".MuiAlert-icon": {
                color: "var(--mf-palette-Alert-projectPrimaryIconColor)",
              },
            },
          },
        ],
      },
    },
  },
};
