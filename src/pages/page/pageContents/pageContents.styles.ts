import { SxProps } from "@mui/material";

export const pageContentsStyles: SxProps = {
  '.page-content': {
    mx: 'auto',
    my: 4,
    py: 4,
    px: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    borderRadius: 'sm',
    boxShadow: 'md',

    '&.message': {
      width: 300,
      marginY: '128px'
    }
  },

  '.alert': {
    // width: 400,
    mx: 'auto',
    marginY: '128px'
  }
};