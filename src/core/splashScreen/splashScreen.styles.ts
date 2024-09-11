import { SxProps } from "@mui/joy/styles/types";

export const splashScreenStyles: SxProps = {
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  zIndex: 1000,
  gap: '32px',
  padding: '32px',

  '.logo-container': {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto',
    width: '200px',
    maxWidth: '100%',
    gap: '8px',
    height: '50vh',
    justifyContent: 'flex-end',

    '.progressbar': {
      width: '100%',
      flex: '0 0 auto'
    }
  },

  '.loading-message': {
    width: '240px',
    maxWidth: '100%',
    textAlign: 'center',
    lineHeight: 1.2
  }
}