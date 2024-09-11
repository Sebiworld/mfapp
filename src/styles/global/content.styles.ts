import { Interpolation } from "@emotion/react";
import { Theme } from "@mui/joy";

export const globalContentStyles: Interpolation<Theme>[] = [
  {
    '.content-block': {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 auto',
      maxWidth: '100%',
      width: '38em',

      '&.center': {
        textAlign: 'center',
      },

      p: {
        position: 'relative',
        maxWidth: '100%',
        width: '38em',
        alignSelf: 'center',
      },
    },
  }
];