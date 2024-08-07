import * as React from 'react';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import List from '@mui/joy/List';
import ListItemButton from '@mui/joy/ListItemButton';
import ModalClose from '@mui/joy/ModalClose';
import ThemeSelect from '@components/ThemeSelect';
import { Stack } from '@mui/joy';
import { sidemenuStyles } from './sidemenu.styles';

export interface SidemenuProps {
  sidemenuOpen: boolean;
  setSidemenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidemenu = ({ sidemenuOpen, setSidemenuOpen }: SidemenuProps) => {
  return (
    <Drawer open={sidemenuOpen} onClose={() => setSidemenuOpen(false)} sx={sidemenuStyles}>
      <Box className="sidemenu-header">
        <Stack className="header-left">
          <ThemeSelect></ThemeSelect>
        </Stack>

        <Stack className="header-right">
          <ModalClose id="close-icon" sx={{ position: 'initial' }} />
        </Stack>
      </Box>

      {/* <Input
        size="sm"
        placeholder="Search"
        variant="plain"
        endDecorator={<Search />}
        slotProps={{
          input: {
            'aria-label': 'Search anything',
          },
        }}
        sx={{
          m: 3,
          borderRadius: 0,
          borderBottom: '2px solid',
          borderColor: 'neutral.outlinedBorder',
          '&:hover': {
            borderColor: 'neutral.outlinedHoverBorder',
          },
          '&::before': {
            border: '1px solid var(--Input-focusedHighlight)',
            transform: 'scaleX(0)',
            left: 0,
            right: 0,
            bottom: '-2px',
            top: 'unset',
            transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
            borderRadius: 0,
          },
          '&:focus-within::before': {
            transform: 'scaleX(1)',
          },
        }}
      /> */}
      <List
        size="lg"
        component="nav"
        sx={{
          flex: 'none',
          fontSize: 'xl',
          '& > div': { justifyContent: 'center' },
        }}
      >
        <ListItemButton sx={{ fontWeight: 'lg' }}>Start</ListItemButton>
        <ListItemButton>Aktuelles</ListItemButton>
        <ListItemButton>Probenplan</ListItemButton>
      </List>
    </Drawer>
  );
};
