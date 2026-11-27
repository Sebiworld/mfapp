import { SxProps, Theme } from "@mui/material";

/** Minimum height of the header bar; the navigation from `md` makes it taller. */
export const HEADER_MIN_HEIGHT = "64px";

/**
 * Header bar that blends between translucent over a hero and solid. The hidden logo keeps `visibility: hidden`
 * (switched only after its fade), so it cannot be reached with the keyboard while it is invisible.
 */
export const headerStyles: SxProps<Theme> = (theme) => ({
  transition:
    "background-color 200ms var(--mf-ease-out), color 200ms var(--mf-ease-out), box-shadow 200ms var(--mf-ease-out)",

  "@media (prefers-reduced-motion: reduce)": {
    transitionDuration: "100ms",
  },

  ".hide-when-translucent": {
    visibility: "visible",
    opacity: 1,
    transition: "opacity 150ms var(--mf-ease-out), visibility 0s",
  },

  "&.translucent": {
    backgroundColor: "transparent",
    backdropFilter: "none",
    WebkitBackdropFilter: "none",

    ".hide-when-translucent": {
      visibility: "hidden",
      opacity: 0,
      transition:
        "opacity 150ms var(--mf-ease-out), visibility 0s linear 150ms",
    },
  },

  ".logo": {
    width: "130px",
    height: "30px",
  },

  "&>.toolbar": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "16px",
    minHeight: HEADER_MIN_HEIGHT,
    alignItems: "center",
    // backgroundColor: 'transparent',
    // backdropFilter: 'blur(10px)',
    // WebkitBackdropFilter: 'blur(10px)',

    "&.dark-bg": {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },

    "&.translucent": {
      backgroundColor: "transparent",
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
    },

    ".container-left, .container-middle, .container-right": {
      display: "flex",
      flexDirection: "row",

      "&>.nav-list": {
        display: "none",
        flexDirection: "row",

        [theme.breakpoints.up("md")]: {
          display: "flex",
        },
      },
    },

    ".container-left": {
      paddingLeft: "16px",
      paddingY: "8px",
    },

    ".container-right": {
      paddingRight: "8px",
      paddingY: "8px",
    },

    ".mf-logo": {
      height: "30px",
    },

    ".MuiIconButton-root": {
      color: "inherit",
    },

    ".nav-item-title": {
      whiteSpace: "nowrap",
    },
  },
});
