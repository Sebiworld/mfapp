
import { extendTheme, PaletteRange } from '@mui/joy/styles';
import { JoyLinkOverwrites } from './MuiOverwrites/JoyLink';
import { JoyAlertOverwrites } from './MuiOverwrites/JoyAlert';
import { JoyButtonOverwrites } from './MuiOverwrites/JoyButton';
import { mfOrange } from './colors';

declare module '@mui/joy/styles' {
  interface ColorPalettePropOverrides {
    light: true;
    dark: true;
    contrast: true;
  }

  interface Palette {
    light: PaletteRange;
    dark: PaletteRange;
    contrast: PaletteRange;
  }
}

export const mfTheme = extendTheme({
  fontFamily: {
    display: "Aileron, -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans- serif",
    body: "Aileron, -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans- serif",
  },

  typography: {
    h1: {
      fontSize: '4rem'
    },
    h2: {
      fontSize: '3.4rem'
    }
  },

  colorSchemes: {
    light: {
      palette: {
        primary: mfOrange,
        danger: {
          "50": "#fef2f2",
          "100": "#fee2e2",
          "200": "#fecaca",
          "300": "#fca5a5",
          "400": "#f87171",
          "500": "#ef4444",
          "600": "#dc2626",
          "700": "#b91c1c",
          "800": "#991b1b",
          "900": "#7f1d1d"
        },
        success: {
          "50": "#f0fdf4",
          "100": "#dcfce7",
          "200": "#bbf7d0",
          "300": "#86efac",
          "400": "#4ade80",
          "500": "#22c55e",
          "600": "#16a34a",
          "700": "#15803d",
          "800": "#166534",
          "900": "#14532d"
        },
        warning: {
          "50": "#fefce8",
          "100": "#fef9c3",
          "200": "#fef08a",
          "300": "#fde047",
          "400": "#facc15",
          "500": "#eab308",
          "600": "#ca8a04",
          "700": "#a16207",
          "800": "#854d0e",
          "900": "#713f12"
        },
        dark: {
          "50": "#fafafa",
          "100": "#f5f5f5",
          "200": "#eeeeee",
          "300": "#e0e0e0",
          "400": "#bdbdbd",
          "500": "#9e9e9e",
          "600": "#757575",
          "700": "#616161",
          "800": "#424242",
          "900": "#212121",
          solidBg: 'var(--joy-palette-dark-400)',
          solidActiveBg: 'var(--joy-palette-dark-500)',
          outlinedBorder: 'var(--joy-palette-dark-700)',
          outlinedColor: 'var(--joy-palette-dark-600)',
          outlinedActiveBg: 'var(--joy-palette-dark-900)',
          softColor: 'var(--joy-palette-dark-500)',
          softBg: 'var(--joy-palette-dark-900)',
          softActiveBg: 'var(--joy-palette-dark-800)',
          plainColor: 'var(--joy-palette-dark-500)',
          plainActiveBg: 'var(--joy-palette-dark-900)',
        },
        light: {
          "50": "#212121",
          "100": "#424242",
          "200": "#616161",
          "300": "#757575",
          "400": "#9e9e9e",
          "500": "#bdbdbd",
          "600": "#e0e0e0",
          "700": "#eeeeee",
          "800": "#f5f5f5",
          "900": "#fafafa",
          solidBg: 'var(--joy-palette-light-400)',
          solidActiveBg: 'var(--joy-palette-light-500)',
          outlinedBorder: 'var(--joy-palette-light-700)',
          outlinedColor: 'var(--joy-palette-light-600)',
          outlinedActiveBg: 'var(--joy-palette-light-900)',
          softColor: 'var(--joy-palette-light-500)',
          softBg: 'var(--joy-palette-light-900)',
          softActiveBg: 'var(--joy-palette-light-800)',
          plainColor: 'var(--joy-palette-light-500)',
          plainActiveBg: 'var(--joy-palette-light-900)',
        },
        contrast: {
          "50": "#fafafa",
          "100": "#f5f5f5",
          "200": "#eeeeee",
          "300": "#e0e0e0",
          "400": "#bdbdbd",
          "500": "#9e9e9e",
          "600": "#757575",
          "700": "#616161",
          "800": "#424242",
          "900": "#212121",
          solidBg: 'var(--joy-palette-contrast-400)',
          solidActiveBg: 'var(--joy-palette-contrast-500)',
          outlinedBorder: 'var(--joy-palette-contrast-700)',
          outlinedColor: 'var(--joy-palette-contrast-600)',
          outlinedActiveBg: 'var(--joy-palette-contrast-900)',
          softColor: 'var(--joy-palette-contrast-500)',
          softBg: 'var(--joy-palette-contrast-900)',
          softActiveBg: 'var(--joy-palette-contrast-800)',
          plainColor: 'var(--joy-palette-contrast-500)',
          plainActiveBg: 'var(--joy-palette-contrast-900)',
        },
      }
    },
    dark: {
      palette: {
        primary: mfOrange,
        danger: {
          "50": "#fef2f2",
          "100": "#fee2e2",
          "200": "#fecaca",
          "300": "#fca5a5",
          "400": "#f87171",
          "500": "#ef4444",
          "600": "#dc2626",
          "700": "#b91c1c",
          "800": "#991b1b",
          "900": "#7f1d1d"
        },
        success: {
          "50": "#f0fdf4",
          "100": "#dcfce7",
          "200": "#bbf7d0",
          "300": "#86efac",
          "400": "#4ade80",
          "500": "#22c55e",
          "600": "#16a34a",
          "700": "#15803d",
          "800": "#166534",
          "900": "#14532d"
        },
        warning: {
          "50": "#fefce8",
          "100": "#fef9c3",
          "200": "#fef08a",
          "300": "#fde047",
          "400": "#facc15",
          "500": "#eab308",
          "600": "#ca8a04",
          "700": "#a16207",
          "800": "#854d0e",
          "900": "#713f12"
        },
        neutral: {
          "50": "#f8f6f3",
          "100": "#f1eeec",
          "200": "#e2e0de",
          "300": "#cbc9c7",
          "400": "#949289",
          "500": "#646159",
          "600": "#474442",
          "700": "#333128",
          "800": "#272521",
          "900": "#0f0d0b"
        },
        dark: {
          "50": "#fafafa",
          "100": "#f5f5f5",
          "200": "#eeeeee",
          "300": "#e0e0e0",
          "400": "#bdbdbd",
          "500": "#9e9e9e",
          "600": "#757575",
          "700": "#616161",
          "800": "#424242",
          "900": "#212121",
          solidBg: 'var(--joy-palette-dark-900)',
          solidActiveBg: 'var(--joy-palette-dark-500)',
          outlinedBorder: 'var(--joy-palette-dark-700)',
          outlinedColor: 'var(--joy-palette-dark-600)',
          outlinedActiveBg: 'var(--joy-palette-dark-900)',
          softColor: 'var(--joy-palette-dark-500)',
          softBg: 'var(--joy-palette-dark-900)',
          softActiveBg: 'var(--joy-palette-dark-800)',
          plainColor: 'var(--joy-palette-dark-500)',
          plainActiveBg: 'var(--joy-palette-dark-900)',
        },
        light: {
          "50": "#212121",
          "100": "#424242",
          "200": "#616161",
          "300": "#757575",
          "400": "#9e9e9e",
          "500": "#bdbdbd",
          "600": "#e0e0e0",
          "700": "#eeeeee",
          "800": "#f5f5f5",
          "900": "#fafafa",
          solidBg: 'var(--joy-palette-light-700)',
          solidColor: 'var(--joy-palette-light-50)',
          solidActiveBg: 'var(--joy-palette-light-900)',
          solidHoverBg: 'var(--joy-palette-light-600)',
          outlinedBorder: 'var(--joy-palette-light-700)',
          outlinedColor: 'var(--joy-palette-light-600)',
          outlinedActiveBg: 'var(--joy-palette-light-900)',
          softColor: 'var(--joy-palette-light-500)',
          softBg: 'var(--joy-palette-light-900)',
          softActiveBg: 'var(--joy-palette-light-800)',
          plainColor: 'var(--joy-palette-light-500)',
          plainActiveBg: 'var(--joy-palette-light-900)',
        },
        contrast: {
          "50": "#212121",
          "100": "#424242",
          "200": "#616161",
          "300": "#757575",
          "400": "#9e9e9e",
          "500": "#bdbdbd",
          "600": "#e0e0e0",
          "700": "#eeeeee",
          "800": "#f5f5f5",
          "900": "#fafafa",
          solidBg: 'var(--joy-palette-contrast-400)',
          solidActiveBg: 'var(--joy-palette-contrast-500)',
          outlinedBorder: 'var(--joy-palette-contrast-700)',
          outlinedColor: 'var(--joy-palette-contrast-600)',
          outlinedActiveBg: 'var(--joy-palette-contrast-900)',
          softColor: 'var(--joy-palette-contrast-500)',
          softBg: 'var(--joy-palette-contrast-900)',
          softActiveBg: 'var(--joy-palette-contrast-800)',
          plainColor: 'var(--joy-palette-contrast-500)',
          plainActiveBg: 'var(--joy-palette-contrast-900)',
        }
      }
    }
  },
  components: {
    ...JoyLinkOverwrites,
    ...JoyAlertOverwrites,
    ...JoyButtonOverwrites
  },
})