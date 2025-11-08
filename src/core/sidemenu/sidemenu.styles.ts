import { SxProps, Theme } from "@mui/material";

export const sidemenuStyles: SxProps<Theme> = (theme) => ({
  ".MuiPaper-root": {
    width: "340px",
    maxWidth: "100%",
    background: theme.vars.palette.background.default,
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
    borderRight: `3px solid ${theme.vars.palette.divider}`,

    ".header-left": {
      position: "absolute",
      top: 0,
      left: 0,
    },

    ".header-center": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "16px 64px",
    },

    ".header-right": {
      position: "absolute",
      top: 0,
      right: 0,
    },
  },

  ".sidemenu-subheader": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px",
    paddingRight: "10px",
    borderRight: `3px solid ${theme.vars.palette.divider}`,
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

  ".sidemenu-content": {
    flex: "1 1 100px",
    borderRight: `3px solid ${theme.vars.palette.divider}`,
    overflowY: "auto",
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

  ".sidemenu-footer": {
    position: "relative",
    background: theme.vars.palette.background.paper,
    paddingTop: "64px",
    paddingLeft: "32px",
    paddingRight: "32px",
    paddingBottom: "32px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "16px",

    ".logo-container": {
      position: "relative",
      display: "block",
      margin: "0 auto",
      maxWidth: "100%",
      width: "120px",
    },

    ".section-spacer.section-spacer": {
      "--background-color": theme.vars.palette.background.paper,
      position: "absolute",
      top: "-20px",
      left: 0,
      width: "100%",
    },
  },
});
