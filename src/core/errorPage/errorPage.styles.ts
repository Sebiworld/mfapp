import { SystemStyleObject } from "@mui/system";
import { Theme } from "@mui/material";

export const errorPageStyles: SystemStyleObject<Theme> = {
  minHeight: "100vh",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
  padding: "32px 16px",
  textAlign: "center",

  "& > p": {
    maxWidth: "480px",
  },
};
