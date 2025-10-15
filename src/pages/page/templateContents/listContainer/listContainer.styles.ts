import { SxProps, Theme } from "@mui/material";

export const listContainerStyles: SxProps<Theme> = {
  position: "relative",
  padding: "0 32px",

  ".items-container": {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "24px",
    paddingTop: "16px",
    marginBottom: "16px",
  },
};
