import { SxProps } from "@mui/joy/styles/types";

export const headerStyles: SxProps = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  height: '48px',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  zIndex: 100,
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)'
}