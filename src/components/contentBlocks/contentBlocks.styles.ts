import { SxProps } from "@mui/joy/styles/types";

export const contentBlocksStyles: SxProps = {
  position: 'relative',
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',

  '.content-block': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    maxWidth: '100%',
    width: '38em',

    '&.center': {
      textAlign: 'center'
    },

    p: {
      position: 'relative',
      maxWidth: '100%',
      width: '38em',
      alignSelf: 'center'
    },
  }
};