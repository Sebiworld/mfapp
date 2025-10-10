import { SxProps } from "@mui/material";

export const virtualizedGridStyles: SxProps = {
  flex: "1",

  "> div": {
    height: "unset !important",
  },

  ".ReactVirtualized__Grid, .ReactVirtualized__Grid__innerScrollContainer": {
    overflow: "visible !important",
  },
};
