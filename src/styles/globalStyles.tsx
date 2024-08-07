import { GlobalStyles } from '@mui/joy';
import { globalFontsStyles } from './global/fonts.styles';

export const globalStyles = (
  <GlobalStyles
    styles={[
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
      },
      ...globalFontsStyles,
    ]}
  />
);
