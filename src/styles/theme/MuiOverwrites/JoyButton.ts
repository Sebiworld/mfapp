import { Components, Theme } from "@mui/joy";

export const JoyButtonOverwrites: Components<Theme> = {
  JoyButton: {
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        ...(ownerState.variant === "solid" && ownerState.color && {
          color: theme.palette[ownerState.color]?.solidColor,

          '&:hover, &:focus': {
            backgroundColor: theme.palette[ownerState.color]?.solidHoverBg,
          }
        }),
      }),
    },
  },
}