import { Components, Theme } from "@mui/joy";

export const JoyModalOverwrites: Components<Theme> = {
  JoyModal: {
    styleOverrides: {
      root: () => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        ".modal-container": {
          width: "500px",
          maxWidth: "90%",
          borderRadius: 0,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          padding: 0,
          height: "auto",
          maxHeight: "90%",

          "&.width-xs": {
            width: "300px",
          },

          "&.width-sm": {
            width: "400px",
          },

          "&.width-lg": {
            width: "800px",
          },

          "&.width-xl": {
            width: "1024px",
          },

          "&.max": {
            width: "100%",
            maxWidth: "100%",
            height: "100%",
          },

          "&>.modal-header, &>.modal-footer": {
            flex: "0 0 auto",
            padding: "16px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "8px",
          },

          "&>.modal-header": {},

          "&>.modal-content": {
            flex: "1 1 auto",
            padding: "16px",
            overflow: "auto",
          },

          "&>.modal-footer": {},

          ".MuiModalClose-root": {
            margin: 0,
          },
        },
      }),
    },
  },
};
