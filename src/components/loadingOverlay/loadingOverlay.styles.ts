import { SxProps } from "@mui/material";

/**
 * The card and the progress bar appear only after 300 ms: a fast answer shows no loading state at all. With reduced
 * motion the delay stays and only the fade goes. The 300 ms count from the moment the splash screen is gone, so the
 * card does not show up under the fading splash; `is-waiting` keeps it hidden until then.
 */
export const loadingOverlayStyles: SxProps = {
  display: "flex",
  position: "relative",
  justifyContent: "center",
  padding: "32px",
  animation: "mf-fade-in 200ms var(--mf-ease-out) 300ms both",

  "@media (prefers-reduced-motion: reduce)": {
    animation: "mf-fade-in 1ms linear 300ms both",
  },

  "&.is-waiting": {
    animation: "none",
    opacity: 0,
  },

  "&.is-progress": {
    padding: 0,

    ".linear-progress": {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
    },
  },

  "&.is-overlay": {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "var(--mf-palette-background-backdrop)",
    WebkitBackdropFilter: "blur(8px)",
    backdropFilter: "blur(8px)",
    padding: "64px 32px",
  },

  ".content-box": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "500px",
    maxWidth: "100%",
    padding: "16px",
    gap: "16px",

    ".spinner": {
      "--CircularProgress-progressColor":
        "var(--mf-palette-projectPrimary-500)",
    },
  },
};
