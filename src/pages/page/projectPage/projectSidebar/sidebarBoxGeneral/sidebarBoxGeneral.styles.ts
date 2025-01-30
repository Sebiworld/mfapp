import { SxProps } from "@mui/material";

export const sidebarBoxGeneralStyles: SxProps = {
  "&>ul": {
    padding: "0 16px",

    "&>li": {
      paddingY: 0,
      paddingLeft: 0,
      minBlockSize: "28px",

      ".MuiListItemDecorator-root": {
        minInlineSize: "24px",
      },

      "&.level-1": {
        paddingLeft: "24px",
      },
    },
  },
};
