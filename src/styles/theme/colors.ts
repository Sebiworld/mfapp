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

  lightChannel: "254 215 170",
  mainChannel: "253 142 0",
  darkChannel: "194 65 12",
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

  lightChannel: "254 202 202",
  mainChannel: "239 68 68",
  darkChannel: "185 28 28",
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

  lightChannel: "187 247 208",
  mainChannel: "34 197 94",
  darkChannel: "21 128 61",
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

  lightChannel: "254 240 138",
  mainChannel: "234 179 8",
  darkChannel: "161 98 7",
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

  lightChannel: "221 231 238",
  mainChannel: "99 107 116",
  darkChannel: "50 56 62",
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

  lightChannel: "226 224 222",
  mainChannel: "100 97 89",
  darkChannel: "51 49 40",
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

  lightChannel: "199 223 247",
  mainChannel: "11 107 203",
  darkChannel: "18 70 123",
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
  "50": "#eeeeee",
  "100": "#d3d3d3",
  "200": "#ababab",
  "300": "#6e6e6e",
  "400": "#2d2d2d",
  "500": "#121212",
  "600": "#0f0f0f",
  "700": "#0d0d0d",
  "800": "#0b0b0b",
  "900": "#030303",

  lightChannel: "171 171 171",
  mainChannel: "18 18 18",
  darkChannel: "13 13 13",
};

export const mfDarkLight: OverridableRecord<PaletteRange, string> = {
  ...mfDark,

  outlinedActiveBg: "var(--mf-palette-dark-200)",
  outlinedBorder: "var(--mf-palette-dark-300)",
  outlinedColor: "var(--mf-palette-dark-500)",
  outlinedDisabledBorder: "var(--mf-palette-neutral-200)",
  outlinedDisabledColor: "var(--mf-palette-neutral-400)",
  outlinedHoverBg: "var(--mf-palette-dark-100)",

  plainActiveBg: "var(--mf-palette-dark-200)",
  plainColor: "var(--mf-palette-dark-500)",
  plainDisabledColor: "var(--mf-palette-neutral-400)",
  plainHoverBg: "var(--mf-palette-dark-100)",

  softActiveBg: "var(--mf-palette-dark-300)",
  softActiveColor: "var(--mf-palette-dark-800)",
  softBg: "var(--mf-palette-dark-100)",
  softColor: "var(--mf-palette-dark-700)",
  softDisabledBg: "var(--mf-palette-neutral-50)",
  softDisabledColor: "var(--mf-palette-neutral-400)",
  softHoverBg: "var(--mf-palette-dark-200)",

  solidActiveBg: "var(--mf-palette-dark-700)",
  solidBg: "var(--mf-palette-dark-500)",
  solidColor: "var(--mf-palette-common-white)",
  solidDisabledBg: "var(--mf-palette-neutral-100)",
  solidDisabledColor: "var(--mf-palette-neutral-400)",
  solidHoverBg: "var(--mf-palette-dark-400)",
};
export const mfDarkDark: OverridableRecord<PaletteRange, string> = {
  ...mfDark,

  outlinedActiveBg: "var(--mf-palette-dark-700)",
  outlinedBorder: "var(--mf-palette-dark-700)",
  outlinedColor: "var(--mf-palette-dark-200)",
  outlinedDisabledBorder: "var(--mf-palette-neutral-800)",
  outlinedDisabledColor: "var(--mf-palette-neutral-500)",
  outlinedHoverBg: "var(--mf-palette-dark-800)",

  plainActiveBg: "var(--mf-palette-dark-700)",
  plainColor: "var(--mf-palette-dark-300)",
  plainDisabledColor: "var(--mf-palette-neutral-500)",
  plainHoverBg: "var(--mf-palette-dark-800)",

  softActiveBg: "var(--mf-palette-dark-600)",
  softActiveColor: "var(--mf-palette-dark-100)",
  softBg: "var(--mf-palette-dark-800)",
  softColor: "var(--mf-palette-dark-200)",
  softDisabledBg: "var(--mf-palette-neutral-800)",
  softDisabledColor: "var(--mf-palette-neutral-500)",
  softHoverBg: "var(--mf-palette-dark-600)",

  solidActiveBg: "var(--mf-palette-dark-700)",
  solidBg: "var(--mf-palette-dark-500)",
  solidColor: "var(--mf-palette-common-white)",
  solidDisabledBg: "var(--mf-palette-neutral-800)",
  solidDisabledColor: "var(--mf-palette-neutral-500)",
  solidHoverBg: "var(--mf-palette-dark-400)",
};

export const mfLight: OverridableRecord<PaletteRange, string> = {
  "50": "#fefefe",
  "100": "#fefefe",
  "200": "#fcfcfc",
  "300": "#fafafa",
  "400": "#f7f7f7",
  "500": "#eeeeee",
  "600": "#c2c2c2",
  "700": "#9d9d9d",
  "800": "#757575",
  "900": "#4f4f4f",

  lightChannel: "252 252 252",
  mainChannel: "238 238 238",
  darkChannel: "157 157 157",
};

export const mfLightLight: OverridableRecord<PaletteRange, string> = {
  ...mfLight,

  outlinedActiveBg: "var(--mf-palette-light-200)",
  outlinedBorder: "var(--mf-palette-light-300)",
  outlinedColor: "var(--mf-palette-light-500)",
  outlinedDisabledBorder: "var(--mf-palette-neutral-200)",
  outlinedDisabledColor: "var(--mf-palette-neutral-400)",
  outlinedHoverBg: "var(--mf-palette-light-100)",

  plainActiveBg: "var(--mf-palette-light-200)",
  plainColor: "var(--mf-palette-light-500)",
  plainDisabledColor: "var(--mf-palette-neutral-400)",
  plainHoverBg: "var(--mf-palette-light-100)",

  softActiveBg: "var(--mf-palette-light-300)",
  softActiveColor: "var(--mf-palette-light-800)",
  softBg: "var(--mf-palette-light-100)",
  softColor: "var(--mf-palette-light-700)",
  softDisabledBg: "var(--mf-palette-neutral-50)",
  softDisabledColor: "var(--mf-palette-neutral-400)",
  softHoverBg: "var(--mf-palette-light-200)",

  solidActiveBg: "var(--mf-palette-light-700)",
  solidBg: "var(--mf-palette-light-500)",
  solidColor: "var(--mf-palette-common-black)",
  solidDisabledBg: "var(--mf-palette-neutral-100)",
  solidDisabledColor: "var(--mf-palette-neutral-400)",
  solidHoverBg: "var(--mf-palette-light-600)",
};
export const mfLightDark: OverridableRecord<PaletteRange, string> = {
  ...mfLight,

  outlinedActiveBg: "var(--mf-palette-light-700)",
  outlinedBorder: "var(--mf-palette-light-700)",
  outlinedColor: "var(--mf-palette-light-200)",
  outlinedDisabledBorder: "var(--mf-palette-neutral-800)",
  outlinedDisabledColor: "var(--mf-palette-neutral-500)",
  outlinedHoverBg: "var(--mf-palette-light-800)",

  plainActiveBg: "var(--mf-palette-light-700)",
  plainColor: "var(--mf-palette-light-300)",
  plainDisabledColor: "var(--mf-palette-neutral-500)",
  plainHoverBg: "var(--mf-palette-light-800)",

  softActiveBg: "var(--mf-palette-light-600)",
  softActiveColor: "var(--mf-palette-light-100)",
  softBg: "var(--mf-palette-light-800)",
  softColor: "var(--mf-palette-light-200)",
  softDisabledBg: "var(--mf-palette-neutral-800)",
  softDisabledColor: "var(--mf-palette-neutral-500)",
  softHoverBg: "var(--mf-palette-light-700)",

  solidActiveBg: "var(--mf-palette-light-700)",
  solidBg: "var(--mf-palette-light-500)",
  solidColor: "var(--mf-palette-common-black)",
  solidDisabledBg: "var(--mf-palette-neutral-800)",
  solidDisabledColor: "var(--mf-palette-neutral-500)",
  solidHoverBg: "var(--mf-palette-light-600)",
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
