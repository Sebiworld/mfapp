import { Components, Theme } from "@mui/joy";

export const JoyLinkOverwrites: Components<Theme> = {
  JoyLink: {
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        ...(ownerState.underline === 'always' && {
          '&:not(:hover)': {
            color: theme.palette.text.primary,
          },
          '&:hover': {
            backgroundColor: 'transparent'
          },
        }),
      }),
    },
  },
}