import { SxProps, Theme } from "@mui/material";

export const headerStyles: SxProps<Theme> = (theme) => ({
  "&.translucent": {
    backgroundColor: "transparent",
    backdropFilter: "none",
    WebkitBackdropFilter: "none",

    ".hide-when-translucent": {
      visibility: "hidden",
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
    minHeight: "64px",
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
