import { SxProps } from "@mui/joy/styles/types";

export const layoutStyles: SxProps = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',

  '.main-content': {
    position: 'relative',
    overflow: 'auto',
    flex: '1 1 100px'
  }
}