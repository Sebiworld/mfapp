import * as React from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import ModalClose from "@mui/joy/ModalClose";
import ThemeSelect from "@components/ThemeSelect";
import { ListItem, Stack } from "@mui/joy";
import { sidemenuStyles } from "./sidemenu.styles";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { useGlobalStore } from "@src/store/global.store";
import { selectSetStartupStep } from "@src/store/auth.store";

export interface SidemenuProps {
  sidemenuOpen: boolean;
  setSidemenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidemenu = ({ sidemenuOpen, setSidemenuOpen }: SidemenuProps) => {
  const { t } = useTranslation();
  const setStartupStep = useGlobalStore(selectSetStartupStep);

  return (
    <Drawer
      open={sidemenuOpen}
      onClose={() => setSidemenuOpen(false)}
      sx={sidemenuStyles}
    >
      <Box className="sidemenu-header">
        <Stack className="header-left">
          <ThemeSelect></ThemeSelect>
        </Stack>

        <Stack className="header-right">
          <ModalClose id="close-icon" sx={{ position: "initial" }} />
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
      <List size="lg" component="nav" className="navigation-list">
        <ListItem>
          <ListItemButton component={Link} to="/">
            {t("sidemenu.home")}
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton component={Link} to="/events" disabled>
            Probenplan
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton component={Link} to="/shop" disabled>
            Shop
          </ListItemButton>
        </ListItem>
      </List>

      <List size="lg" component="nav" className="navigation-list">
        <ListItem>
          <ListItemButton component={Link} to="/settings">
            {t("sidemenu.settings")}
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton
            onClick={() => {
              setStartupStep("startup");
              setSidemenuOpen(false);
            }}
          >
            {t("sidemenu.login")}
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
