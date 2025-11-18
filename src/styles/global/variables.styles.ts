import { Interpolation } from "@emotion/react";
import { Theme } from "@mui/material";
import { mfBg } from "@styles/theme/paletteColors/mfBg";
import { mfContrast } from "@styles/theme/paletteColors/mfContrast";
import { mfPrimary } from "@styles/theme/paletteColors/mfPrimary";
import { mfSecondary } from "@styles/theme/paletteColors/mfSecondary";

// interface AlertPropsColorOverrides {
//   primary: true;
//   secondary: true;
//   tertiary: true;
//   success: true;
//   warning: true;
//   danger: true;
//   light: true;
//   medium: true;
//   dark: true;
//   lighter: true;
//   transparent: true;
//   bg: true;
//   contrast: true;
//   projectPrimary: true;
// }

export const globalVariablesStyles: Interpolation<Theme>[] = [
  {
    ":root": {
      "--mf-radius-sm": 0,

      // Custom alert colors
      "--mf-palette-Alert-primaryFilledBg": "var(--mf-palette-primary-500)",
      "--mf-palette-Alert-primaryFilledColor":
        "var(--mf-palette-primary-contrastText)",
      "--mf-palette-Alert-primaryStandardBg": `rgba(${mfPrimary.mainRgb}, 0.2)`,
      "--mf-palette-Alert-primaryColor": "var(--mf-palette-primary-800)",
      "--mf-palette-Alert-primaryIconColor": "var(--mf-palette-primary-500)",

      "--mf-palette-Alert-secondaryFilledBg": "var(--mf-palette-secondary-500)",
      "--mf-palette-Alert-secondaryFilledColor":
        "var(--mf-palette-secondary-contrastText)",
      "--mf-palette-Alert-secondaryStandardBg": `rgba(${mfSecondary.mainRgb}, 0.2)`,
      "--mf-palette-Alert-secondaryColor": "var(--mf-palette-secondary-800)",
      "--mf-palette-Alert-secondaryIconColor":
        "var(--mf-palette-secondary-500)",

      "--mf-palette-Alert-bgFilledBg": "var(--mf-palette-bg-500)",
      "--mf-palette-Alert-bgFilledColor": "var(--mf-palette-bg-contrastText)",
      "--mf-palette-Alert-bgStandardBg": `rgba(${mfBg.mainRgb}, 0.2)`,
      "--mf-palette-Alert-bgColor": "var(--mf-palette-bg-800)",
      "--mf-palette-Alert-bgIconColor": "var(--mf-palette-bg-500)",

      "--mf-palette-Alert-contrastFilledBg": "var(--mf-palette-contrast-500)",
      "--mf-palette-Alert-contrastFilledColor":
        "var(--mf-palette-contrast-contrastText)",
      "--mf-palette-Alert-contrastStandardBg": `rgba(${mfContrast.mainRgb}, 0.2)`,
      "--mf-palette-Alert-contrastColor": "var(--mf-palette-contrast-800)",
      "--mf-palette-Alert-contrastIconColor": "var(--mf-palette-contrast-500)",

      "--mf-palette-Alert-projectPrimaryFilledBg":
        "var(--mf-palette-primary-500)",
      "--mf-palette-Alert-projectPrimaryFilledColor":
        "var(--mf-palette-primary-contrastText)",
      "--mf-palette-Alert-projectPrimaryStandardBg": `rgba(${mfPrimary.mainRgb}, 0.2)`,
      "--mf-palette-Alert-projectPrimaryColor":
        "var(--mf-palette-projectPrimary-800)",
      "--mf-palette-Alert-projectPrimaryIconColor":
        "var(--mf-palette-projectPrimary-500)",
    },
  },
];
