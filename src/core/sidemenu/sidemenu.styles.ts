import { SxProps, Theme } from "@mui/material";

export const sidemenuStyles: SxProps<Theme> = (theme) => ({
  ".MuiPaper-root": {
    width: "340px",
    maxWidth: "100%",
    background: theme.vars.palette.background.paper,
  },

  ".MuiDrawer-content": {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },

  ".sidemenu-header": {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "42px",

    ".header-left": {
      position: "absolute",
      top: 0,
      left: 0,
    },

    ".header-right": {
      position: "absolute",
      top: 0,
      right: 0,
    },
  },

  ".user-box": {
    paddingTop: "16px",
    alignItems: "center",
    gap: "8px",

    "&>.name": {
      textTransform: "capitalize",
      fontWeight: "bold",
    },
  },

  ".nav-container": {
    "&>.nav-title": {
      padding: "32px 32px 0 32px",
      fontSize: theme.typography.body2.fontSize,
      opacity: 0.5,
    },
  },

  ".navigation-list": {
    fontSize: "xl",

    "&>li": {
      padding: "0 32px",
    },

    ".MuiListItemIcon-root": {
      minWidth: "40px",
    },

    ".MuiListItemButton-root": {
      justifyContent: "flex-start",

      "&.active": {
        fontWeight: "lg",
      },
    },
  },

  hr: {
    margin: "32px",
    width: "64px",
    maxWidth: "calc(100% - 32px)",
    opacity: 0.5,
    backgroundColor: theme.vars.palette.primary.main,
  },
});
