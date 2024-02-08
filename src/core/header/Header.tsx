import { Box, IconButton } from '@mui/joy';
import Menu from '@mui/icons-material/Menu';
import { headerStyles } from './header.styles';

export interface HeaderProps {
  sidemenuOpen?: boolean;
  setSidemenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ setSidemenuOpen }: HeaderProps) => {
  return (
    <Box component="header" sx={headerStyles}>
      <Box className="container-left"></Box>

      <Box className="container-middle"></Box>

      <Box className="container-right">
        {setSidemenuOpen && (
          <IconButton variant="outlined" color="neutral" onClick={() => setSidemenuOpen(true)}>
            <Menu />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};
