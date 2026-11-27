import { keyframes } from "@emotion/react";
import { Components, Theme } from "@mui/material/styles";

// Keyframes rather than transitions: the fade of `ModalTransition` writes its own inline `transition`.
const modalEnter = keyframes`
  from {
    transform: scale(0.97);
  }
  to {
    transform: scale(1);
  }
`;

const modalExit = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.98);
  }
`;

/** Fade of the backdrop, the same as the dialog's (`ModalTransition`): 200 ms in, 150 ms out. */
const BACKDROP_TRANSITION = { enter: 200, exit: 150 };

export const MuiModalOverwrites: Components<Theme> = {
  MuiModal: {
    defaultProps: {
      slotProps: {
        backdrop: { transitionDuration: BACKDROP_TRANSITION },
      },
    },

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

          // Set by `ModalTransition`; dialogs without it neither scale nor fade. After the entrance no transform
          // stays behind, so the open dialog is no containing block for fixed content.
          '&[data-motion="enter"]': {
            animation: `${modalEnter} 300ms var(--mf-spring) backwards`,
          },

          // Holds the end state until the modal removes the dialog.
          '&[data-motion="exit"]': {
            animation: `${modalExit} 150ms var(--mf-ease-out) both`,
          },

          // Reduced motion: only the fade of `ModalTransition` remains.
          "@media (prefers-reduced-motion: reduce)": {
            "&[data-motion]": {
              animation: "none",
            },
          },
        },
      }),
    },
  },
};
