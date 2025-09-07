import { SxProps } from "@mui/material";

export const sidebarBoxLinksStyles: SxProps = {
  "&>ul": {
    padding: "0",

    "&>li": {
      paddingY: 0,
      paddingLeft: 0,
      minBlockSize: "28px",

      "&>a": {
        paddingTop: "0",
        paddingBottom: "0",
      },

      ".MuiListItemIcon-root": {
        minWidth: "24px",
      },

      "&.level-1": {
        paddingLeft: "24px",
      },
    },
  },
};
