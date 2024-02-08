import { SxProps } from "@mui/joy/styles/types";

export const mfLogoStyles: SxProps = {
  '--logo-start-color': '#fd8e00',
  '--logo-end-color': '#58585a',
  position: 'relative',
  display: 'block',

  '&.theme-dark': {
    '--logo-end-color': '#ffffff'
  },

  '.logo-start': {
    fill: 'var(--logo-start-color)'
  },

  '.logo-end': {
    fill: 'var(--logo-end-color)'
  }
}