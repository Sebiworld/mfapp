import { SxProps, Theme } from "@mui/material";

export const articlesContainerStyles: SxProps<Theme> = {

  padding: "0 32px",

  ".items-container": {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
    minHeight: "500px",
    marginTop: "16px",
    marginBottom: "16px",
  },
};
