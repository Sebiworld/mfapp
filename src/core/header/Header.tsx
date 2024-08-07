import { Box, IconButton, Sheet } from '@mui/joy';
import Menu from '@mui/icons-material/Menu';
import { headerStyles } from './header.styles';

export interface HeaderState {
  color?: 'default' | 'dark' | 'transparent' | 'translucent';
}

export interface HeaderProps extends HeaderState {
  sidemenuOpen?: boolean;
  setSidemenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ setSidemenuOpen, color }: HeaderProps) => {
  return (
    <Sheet component="header" className={`color-${color || 'default'}`} sx={headerStyles}>
      <Box component="nav" className="container-left"></Box>

      <Box component="nav" className="container-middle"></Box>

      <Box component="nav" className="container-right">
        {setSidemenuOpen && (
          <IconButton variant="outlined" color="neutral" onClick={() => setSidemenuOpen(true)}>
            <Menu />
          </IconButton>
        )}
      </Box>
    </Sheet>
  );
};
