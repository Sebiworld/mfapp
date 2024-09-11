import { SxProps } from "@mui/joy/styles/types";
import { mfTheme } from "@styles/theme/mfTheme";

export const sectionContainerStyles: SxProps = {
  '.section': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '64px',
    // background- color: $body-bg;
    padding: '64px',

    [mfTheme.breakpoints.down('md')]: {
      padding: '48px 24px',
    }
  }
};