import { Components, Theme } from "@mui/material/styles";

export const MuiModalOverwrites: Components<Theme> = {
  MuiModal: {
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
          gap: "16px",

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

          ".actions": {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: "4px",
          },

          "&>.modal-header, &>.modal-footer": {
            flex: "0 0 auto",
            padding: "16px 32px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "8px",
            justifyContent: "space-between",
          },

          "&>.modal-header": {
            position: "relative",
            paddingTop: "8px",
            paddingBottom: "8px",
            paddingRight: "16px",

            "&>.title": {
              fontSize: "24px",
              fontWeight: 600,
            },

            "&>.actions": {
              alignSelf: "flex-end",
            },

            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: "16px",
              right: "16px",
              borderBottom: `2px solid var(--mf-palette-contrast-900)`,
            },
          },

          "&>.modal-content": {
            flex: "1 1 auto",
            padding: "16px 32px",
            overflow: "auto",
            postition: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            paddingTop: 0,

            section: {
              postition: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "8px",

              "&>p": {
                margin: 0,
              },

              "&.center": {
                alignItems: "center",
              },
            },
          },

          "&:has.modal-footer": {
            ".modal-content": {
              paddingBottom: 0,
            },
          },

          "&>.modal-footer": {
            paddingTop: 0,
          },

          ".MuiModalClose-root": {
            margin: 0,
          },
        },
      }),
    },
  },
};
