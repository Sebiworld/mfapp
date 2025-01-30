import { SxProps } from "@mui/material";

export const sidemenuStyles: SxProps = {
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
    minHeight: '42px',

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

  ".navigation-list": {
    fontSize: "xl",

    ".MuiListItemButton-root": {
      justifyContent: "center",

      "&.active": {
        fontWeight: "lg",
      },
    },
  },
};
