import { Interpolation } from "@emotion/react";
import { Theme } from "@mui/material";
import { mfBg } from "@styles/theme/paletteColors/mfBg";
import { mfContrast } from "@styles/theme/paletteColors/mfContrast";
import { mfPrimary } from "@styles/theme/paletteColors/mfPrimary";
import { mfSecondary } from "@styles/theme/paletteColors/mfSecondary";

// interface AlertPropsColorOverrides {
//   primary: true;
//   secondary: true;
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

// Shared motion curves. The spring is a sampled curve with a visible overshoot, tuned for about 580 ms.
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const EASE_DRAWER = "cubic-bezier(0.32, 0.72, 0, 1)";
const SPRING =
  "linear(0, 0.06, 0.2, 0.371, 0.541, 0.692, 0.815, 0.907, 0.972, 1.013, 1.036, 1.045, 1.045, 1.041, 1.033, 1.025, 1.018, 1.011, 1.006, 1.003, 1, 0.999, 0.998, 0.998, 1)";

export const globalVariablesStyles: Interpolation<Theme>[] = [
  {
    ":root": {
      "--mf-radius-sm": 0,

      // Motion
      "--mf-ease-out": EASE_OUT,
      "--mf-ease-drawer": EASE_DRAWER,
      "--mf-spring": SPRING,

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

    // Shared fade for elements that appear late, e.g. the loading card.
    "@keyframes mf-fade-in": {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },

    // Browsers without linear() would drop every transition that uses the spring; ease out instead.
    "@supports not (transition-timing-function: linear(0, 1))": {
      ":root": {
        "--mf-spring": EASE_OUT,
      },
    },
  },
];
