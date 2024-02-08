import { SxProps } from "@mui/joy/styles/types";
import { mfTheme } from "@styles/mfTheme";

export const sectionSpacerStyles: SxProps = {
  '--background-color': '#ffffff',
  '--main-color': '#fd8a00',
  '--logo-start-color': 'var(--main-color)',
  '--logo-end-color': '#ffffff',

  position: 'relative',
  display: 'block',

  '.main-color-stripe': {
    fill: 'var(--main-color)'
  },

  '.background-color-stripe': {
    fill: 'var(--background-color)'
  },

  '.logo-start': {
    fill: 'var(--logo-start-color)'
  },

  '.logo-end': {
    fill: 'var(--logo-end-color)'
  },

  '&.section-spacer': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',

    '.spacer-up, .logo-wide, .logo-mobile': {
      display: 'none',
    },

    '&.logo-none': {
      '&.position-top': {
        '.spacer-up': {
          display: 'block',
        },

        '.spacer-down': {
          display: 'none',
        }
      }
    },

    '&.logo-wide': {
      '.logo-wide': {
        display: 'block'
      },

      '.spacer-down': {
        display: 'none'
      },
    },

    '&.logo-mobile': {
      '.logo-mobile': {
        display: 'block'
      },

      '.spacer-down': {
        display: 'none'
      }
    },

    '&.logo-auto': {
      '.spacer-down': {
        display: 'none'
      },

      '.logo-wide': {
        display: 'none'
      },

      '.logo-mobile': {
        display: 'block'
      },

      [mfTheme.breakpoints.up('md')]: {
        '.logo-wide': {
          display: 'block'
        },

        '.logo-mobile': {
          display: 'none'
        }
      }
    }
  }
}