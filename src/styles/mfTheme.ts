
import { extendTheme } from '@mui/joy/styles';
import { JoyLinkOverwrites } from './MuiOverwrites/JoyLink';

declare module '@mui/joy/styles' {
  // No custom tokens found, you can skip the theme augmentation.
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
        primary: {
          "50": "#fff7ed",
          "100": "#ffedd5",
          "200": "#fed7aa",
          "300": "#fdba74",
          "400": "#fb923c",
          "500": "#fd8e00",
          "600": "#ea580c",
          "700": "#c2410c",
          "800": "#9a3412",
          "900": "#7c2d12"
        },
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
        }
      }
    },
    dark: {
      palette: {
        primary: {
          "50": "#fff7ed",
          "100": "#ffedd5",
          "200": "#fed7aa",
          "300": "#fdba74",
          "400": "#fb923c",
          "500": "#fd8e00",
          "600": "#ea580c",
          "700": "#c2410c",
          "800": "#9a3412",
          "900": "#7c2d12"
        },
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
        }
      }
    }
  },
  components: {
    ...JoyLinkOverwrites
  },
})