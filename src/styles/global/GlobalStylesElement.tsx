import { GlobalStyles } from '@mui/joy';
import { globalFontsStyles } from './fonts.styles';
import { globalContentStyles } from './content.styles';

export const GlobalStylesElement = <GlobalStyles styles={[...globalContentStyles, ...globalFontsStyles]} />;
