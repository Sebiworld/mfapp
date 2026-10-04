import { Components, Theme } from "@mui/material/styles";

export const MuiPaperOverwrites: Components<Theme> = {
  MuiPaper: {
    // The design system is flat: surfaces in the page flow separate by fill, not by shadow. Floating layers
    // (menus, popovers, dialogs, drawers) pass their own elevation and keep it.
    defaultProps: {
      elevation: 0,
    },
  },
};
