import { SxProps, Theme } from "@mui/material";

export const articlesContainerStyles: SxProps<Theme> = {
  ".items-container": {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
    margin: "32px",
  },
};
