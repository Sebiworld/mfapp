import { SxProps } from "@mui/joy/styles/types";

export const sidemenuStyles: SxProps = {
  ".sidemenu-header": {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
