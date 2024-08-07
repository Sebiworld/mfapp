import { SxProps } from "@mui/material";

export const defaultPageStyles: SxProps = {
  '.page-content': {
    mx: 'auto', // margin left & right
    my: 4, // margin top & bottom
    py: 4, // padding top & bottom
    px: 2, // padding left & right
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
  }
};