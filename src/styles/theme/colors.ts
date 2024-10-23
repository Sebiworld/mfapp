import { PaletteRange } from "@mui/joy";
import { OverridableRecord } from "@mui/joy/styles/types/utils";

export const mfPrimary: OverridableRecord<PaletteRange, string> = {
  "50": "#fff7ed",
  "100": "#ffedd5",
  "200": "#fed7aa",
  "300": "#fdba74",
  "400": "#fb923c",
  "500": "#fd8e00",
  "600": "#ea580c",
  "700": "#c2410c",
  "800": "#9a3412",
  "900": "#7c2d12",
};
export const mfPrimaryLight: OverridableRecord<PaletteRange, string> = {
  ...mfPrimary,

  outlinedActiveBg: "var(--mf-palette-primary-200)",
  outlinedBorder: "var(--mf-palette-primary-300)",
  outlinedColor: "var(--mf-palette-primary-500)",
  outlinedDisabledBorder: "var(--mf-palette-neutral-200)",
  outlinedDisabledColor: "var(--mf-palette-neutral-400)",
  outlinedHoverBg: "var(--mf-palette-primary-100)",

  plainActiveBg: "var(--mf-palette-primary-200)",
  plainColor: "var(--mf-palette-primary-500)",
  plainDisabledColor: "var(--mf-palette-neutral-400)",
  plainHoverBg: "var(--mf-palette-primary-100)",

  softActiveBg: "var(--mf-palette-primary-300)",
  softActiveColor: "var(--mf-palette-primary-800)",
  softBg: "var(--mf-palette-primary-100)",
  softColor: "var(--mf-palette-primary-700)",
  softDisabledBg: "var(--mf-palette-neutral-50)",
  softDisabledColor: "var(--mf-palette-neutral-400)",
  softHoverBg: "var(--mf-palette-primary-200)",

  solidActiveBg: "var(--mf-palette-primary-700)",
  solidBg: "var(--mf-palette-primary-500)",
  solidColor: "var(--mf-palette-common-white)",
  solidDisabledBg: "var(--mf-palette-neutral-100)",
  solidDisabledColor: "var(--mf-palette-neutral-400)",
  solidHoverBg: "var(--mf-palette-primary-600)",
};

export const mfPrimaryDark: OverridableRecord<PaletteRange, string> = {
  ...mfPrimary,

  outlinedActiveBg: "var(--mf-palette-primary-700)",
  outlinedBorder: "var(--mf-palette-primary-700)",
  outlinedColor: "var(--mf-palette-primary-200)",
  outlinedDisabledBorder: "var(--mf-palette-neutral-800)",
  outlinedDisabledColor: "var(--mf-palette-neutral-500)",
  outlinedHoverBg: "var(--mf-palette-primary-800)",

  plainActiveBg: "var(--mf-palette-primary-700)",
  plainColor: "var(--mf-palette-primary-300)",
  plainDisabledColor: "var(--mf-palette-neutral-500)",
  plainHoverBg: "var(--mf-palette-primary-800)",

  softActiveBg: "var(--mf-palette-primary-600)",
  softActiveColor: "var(--mf-palette-primary-100)",
  softBg: "var(--mf-palette-primary-800)",
  softColor: "var(--mf-palette-primary-200)",
  softDisabledBg: "var(--mf-palette-neutral-800)",
  softDisabledColor: "var(--mf-palette-neutral-500)",
  softHoverBg: "var(--mf-palette-primary-700)",

  solidActiveBg: "var(--mf-palette-primary-700)",
  solidBg: "var(--mf-palette-primary-500)",
  solidColor: "var(--mf-palette-common-white)",
  solidDisabledBg: "var(--mf-palette-neutral-800)",
  solidDisabledColor: "var(--mf-palette-neutral-500)",
  solidHoverBg: "var(--mf-palette-primary-600)",
};

export const mfDanger: OverridableRecord<PaletteRange, string> = {
  "50": "#fef2f2",
  "100": "#fee2e2",
  "200": "#fecaca",
  "300": "#fca5a5",
  "400": "#f87171",
  "500": "#ef4444",
  "600": "#dc2626",
  "700": "#b91c1c",
  "800": "#991b1b",
  "900": "#7f1d1d",
};

export const mfSuccess: OverridableRecord<PaletteRange, string> = {
  "50": "#f0fdf4",
  "100": "#dcfce7",
  "200": "#bbf7d0",
  "300": "#86efac",
  "400": "#4ade80",
  "500": "#22c55e",
  "600": "#16a34a",
  "700": "#15803d",
  "800": "#166534",
  "900": "#14532d",
};

export const mfWarning: OverridableRecord<PaletteRange, string> = {
  "50": "#fefce8",
  "100": "#fef9c3",
  "200": "#fef08a",
  "300": "#fde047",
  "400": "#facc15",
  "500": "#eab308",
  "600": "#ca8a04",
  "700": "#a16207",
  "800": "#854d0e",
  "900": "#713f12",
};

export const mfNeutralLight: OverridableRecord<PaletteRange, string> = {
  "50": "#FBFCFE",
  "100": "#F0F4F8",
  "200": "#DDE7EE",
  "300": "#CDD7E1",
  "400": "#9FA6AD",
  "500": "#636B74",
  "600": "#555E68",
  "700": "#32383E",
  "800": "#171A1C",
  "900": "#0B0D0E",
};

export const mfNeutralDark: OverridableRecord<PaletteRange, string> = {
  "50": "#f8f6f3",
  "100": "#f1eeec",
  "200": "#e2e0de",
  "300": "#cbc9c7",
  "400": "#949289",
  "500": "#646159",
  "600": "#474442",
  "700": "#333128",
  "800": "#272521",
  "900": "#0f0d0b",
};

export const mfInfo: OverridableRecord<PaletteRange, string> = {
  50: "#051423",
  100: "#E3EFFB",
  200: "#C7DFF7",
  300: "#97C3F0",
  400: "#4393E4",
  500: "#0B6BCB",
  600: "#185EA5",
  700: "#12467B",
  800: "#0A2744",
  900: "#051423",

  darkChannel: "18 70 123",
  lightChannel: "199 223 247",
  mainChannel: "11 107 203",
};
export const mfInfoLight: OverridableRecord<PaletteRange, string> = {
  ...mfInfo,

  outlinedActiveBg: "var(--mf-palette-info-200)",
  outlinedBorder: "var(--mf-palette-info-300)",
  outlinedColor: "var(--mf-palette-info-500)",
  outlinedDisabledBorder: "var(--mf-palette-neutral-200)",
  outlinedDisabledColor: "var(--mf-palette-neutral-400)",
  outlinedHoverBg: "var(--mf-palette-info-100)",

  plainActiveBg: "var(--mf-palette-info-200)",
  plainColor: "var(--mf-palette-info-500)",
  plainDisabledColor: "var(--mf-palette-neutral-400)",
  plainHoverBg: "var(--mf-palette-info-100)",

  softActiveBg: "var(--mf-palette-info-300)",
  softActiveColor: "var(--mf-palette-info-800)",
  softBg: "var(--mf-palette-info-100)",
  softColor: "var(--mf-palette-info-700)",
  softDisabledBg: "var(--mf-palette-neutral-50)",
  softDisabledColor: "var(--mf-palette-neutral-400)",
  softHoverBg: "var(--mf-palette-info-200)",

  solidActiveBg: "var(--mf-palette-info-700)",
  solidBg: "var(--mf-palette-info-500)",
  solidColor: "var(--mf-palette-common-white)",
  solidDisabledBg: "var(--mf-palette-neutral-100)",
  solidDisabledColor: "var(--mf-palette-neutral-400)",
  solidHoverBg: "var(--mf-palette-info-600)",
};
export const mfInfoDark: OverridableRecord<PaletteRange, string> = {
  ...mfInfo,

  outlinedActiveBg: "var(--mf-palette-info-700)",
  outlinedBorder: "var(--mf-palette-info-700)",
  outlinedColor: "var(--mf-palette-info-200)",
  outlinedDisabledBorder: "var(--mf-palette-neutral-800)",
  outlinedDisabledColor: "var(--mf-palette-neutral-500)",
  outlinedHoverBg: "var(--mf-palette-info-800)",

  plainActiveBg: "var(--mf-palette-info-700)",
  plainColor: "var(--mf-palette-info-300)",
  plainDisabledColor: "var(--mf-palette-neutral-500)",
  plainHoverBg: "var(--mf-palette-info-800)",

  softActiveBg: "var(--mf-palette-info-600)",
  softActiveColor: "var(--mf-palette-info-100)",
  softBg: "var(--mf-palette-info-800)",
  softColor: "var(--mf-palette-info-200)",
  softDisabledBg: "var(--mf-palette-neutral-800)",
  softDisabledColor: "var(--mf-palette-neutral-500)",
  softHoverBg: "var(--mf-palette-info-700)",

  solidActiveBg: "var(--mf-palette-info-700)",
  solidBg: "var(--mf-palette-info-500)",
  solidColor: "var(--mf-palette-common-white)",
  solidDisabledBg: "var(--mf-palette-neutral-800)",
  solidDisabledColor: "var(--mf-palette-neutral-500)",
  solidHoverBg: "var(--mf-palette-info-600)",
};

export const mfDark: OverridableRecord<PaletteRange, string> = {
  "50": "#fafafa",
  "100": "#f5f5f5",
  "200": "#eeeeee",
  "300": "#e0e0e0",
  "400": "#bdbdbd",
  "500": "#9e9e9e",
  "600": "#757575",
  "700": "#616161",
  "800": "#323232",
  "900": "#121212",
  solidColor: "var(--mf-palette-common-white)",
  solidBg: "var(--mf-palette-dark-900)",
  solidHoverBg: "var(--mf-palette-dark-800)",
  solidActiveBg: "var(--mf-palette-dark-700)",
  outlinedBorder: "var(--mf-palette-dark-700)",
  outlinedColor: "var(--mf-palette-dark-600)",
  outlinedActiveBg: "var(--mf-palette-dark-900)",
  softColor: "var(--mf-palette-dark-500)",
  softBg: "var(--mf-palette-dark-900)",
  softActiveBg: "var(--mf-palette-dark-800)",
  plainColor: "var(--mf-palette-dark-500)",
  plainActiveBg: "var(--mf-palette-dark-900)",
};

export const mfLight: OverridableRecord<PaletteRange, string> = {
  "50": "#121212",
  "100": "#323232",
  "200": "#616161",
  "300": "#757575",
  "400": "#9e9e9e",
  "500": "#bdbdbd",
  "600": "#e0e0e0",
  "700": "#eeeeee",
  "800": "#f5f5f5",
  "900": "#fafafa",
  solidColor: "var(--mf-palette-common-black)",
  solidBg: "var(--mf-palette-light-700)",
  solidHoverBg: "var(--mf-palette-light-800)",
  solidActiveBg: "var(--mf-palette-light-900)",
  outlinedBorder: "var(--mf-palette-light-700)",
  outlinedColor: "var(--mf-palette-light-600)",
  outlinedActiveBg: "var(--mf-palette-light-900)",
  softColor: "var(--mf-palette-light-500)",
  softBg: "var(--mf-palette-light-900)",
  softActiveBg: "var(--mf-palette-light-800)",
  plainColor: "var(--mf-palette-light-500)",
  plainActiveBg: "var(--mf-palette-light-900)",
};

export const mfProjectPrimaryLight: OverridableRecord<PaletteRange, string> = {
  ...mfPrimary,

  outlinedActiveBg: "var(--mf-palette-projectPrimary-200)",
  outlinedBorder: "var(--mf-palette-projectPrimary-300)",
  outlinedColor: "var(--mf-palette-projectPrimary-500)",
  outlinedDisabledBorder: "var(--mf-palette-neutral-200)",
  outlinedDisabledColor: "var(--mf-palette-neutral-400)",
  outlinedHoverBg: "var(--mf-palette-projectPrimary-100)",

  plainActiveBg: "var(--mf-palette-projectPrimary-200)",
  plainColor: "var(--mf-palette-projectPrimary-500)",
  plainDisabledColor: "var(--mf-palette-neutral-400)",
  plainHoverBg: "var(--mf-palette-projectPrimary-100)",

  softActiveBg: "var(--mf-palette-projectPrimary-300)",
  softActiveColor: "var(--mf-palette-projectPrimary-800)",
  softBg: "var(--mf-palette-projectPrimary-100)",
  softColor: "var(--mf-palette-projectPrimary-700)",
  softDisabledBg: "var(--mf-palette-neutral-50)",
  softDisabledColor: "var(--mf-palette-neutral-400)",
  softHoverBg: "var(--mf-palette-projectPrimary-200)",

  solidActiveBg: "var(--mf-palette-projectPrimary-700)",
  solidBg: "var(--mf-palette-projectPrimary-500)",
  solidColor: "var(--mf-palette-common-white)",
  solidDisabledBg: "var(--mf-palette-neutral-100)",
  solidDisabledColor: "var(--mf-palette-neutral-400)",
  solidHoverBg: "var(--mf-palette-projectPrimary-600)",
};
export const mfProjectPrimaryDark: OverridableRecord<PaletteRange, string> = {
  ...mfPrimary,

  outlinedActiveBg: "var(--mf-palette-projectPrimary-700)",
  outlinedBorder: "var(--mf-palette-projectPrimary-700)",
  outlinedColor: "var(--mf-palette-projectPrimary-200)",
  outlinedDisabledBorder: "var(--mf-palette-neutral-800)",
  outlinedDisabledColor: "var(--mf-palette-neutral-500)",
  outlinedHoverBg: "var(--mf-palette-projectPrimary-800)",

  plainActiveBg: "var(--mf-palette-projectPrimary-700)",
  plainColor: "var(--mf-palette-projectPrimary-300)",
  plainDisabledColor: "var(--mf-palette-neutral-500)",
  plainHoverBg: "var(--mf-palette-projectPrimary-800)",

  softActiveBg: "var(--mf-palette-projectPrimary-600)",
  softActiveColor: "var(--mf-palette-projectPrimary-100)",
  softBg: "var(--mf-palette-projectPrimary-800)",
  softColor: "var(--mf-palette-projectPrimary-200)",
  softDisabledBg: "var(--mf-palette-neutral-800)",
  softDisabledColor: "var(--mf-palette-neutral-500)",
  softHoverBg: "var(--mf-palette-projectPrimary-700)",

  solidActiveBg: "var(--mf-palette-projectPrimary-700)",
  solidBg: "var(--mf-palette-projectPrimary-500)",
  solidColor: "var(--mf-palette-common-white)",
  solidDisabledBg: "var(--mf-palette-neutral-800)",
  solidDisabledColor: "var(--mf-palette-neutral-500)",
  solidHoverBg: "var(--mf-palette-projectPrimary-600)",
};
