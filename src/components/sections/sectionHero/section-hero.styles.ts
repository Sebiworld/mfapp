import { SxProps } from "@mui/material";

export const sectionHeroStyles: SxProps = {
  position: 'relative',

  '&.section': {
    padding: '0',
  },

  '.section-spacer': {
    bottom: '-16px',
    display: "block",
    height: "auto",
    left: 0,
    position: "absolute",
    width: "100%",
    zIndex: "100",
  },

  '.lazy-picture > img': {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    overflowClipMargin: 'content-box'
  }
}