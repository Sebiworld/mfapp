import { SxProps } from "@mui/joy/styles/types";

export const headerStyles: SxProps = {
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: "16px",
  minHeight: "48px",
  alignItems: "center",
  // backgroundColor: 'transparent',
  zIndex: 1000,
  // backdropFilter: 'blur(10px)',
  // WebkitBackdropFilter: 'blur(10px)',

  "&.dark-bg": {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },

  "&.transparent-bg": {
    backgroundColor: "transparent",
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
  },

  ".container-left": {
    paddingLeft: "16px",
    paddingY: "8px",
  },

  ".container-right": {
    paddingRight: "8px",
    paddingY: "8px",
  },

  ".mf-logo": {
    height: "30px",
  },
};
