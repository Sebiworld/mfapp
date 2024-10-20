import { GlobalStyles } from '@mui/joy';
import { globalFontsStyles } from './fonts.styles';
import { globalContentStyles } from './content.styles';
import { globalVariablesStyles } from './variables.styles';

export const GlobalStylesElement = (
  <GlobalStyles
    styles={[
      ...globalVariablesStyles,
      ...globalContentStyles,
      ...globalFontsStyles,
    ]}
  />
);
