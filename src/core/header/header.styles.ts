import { SxProps } from "@mui/material";

export const headerStyles: SxProps = {
  "&.translucent": {
    backgroundColor: "transparent",
    backdropFilter: "none",
    WebkitBackdropFilter: "none",

    ".hide-when-translucent": {
      visibility: "hidden",
    },
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
  },
};
