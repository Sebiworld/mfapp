import * as React from "react";
import ThemeSelect from "@components/ThemeSelect";
import { sidemenuStyles } from "./sidemenu.styles";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { useGlobalStore } from "@src/store/global.store";
import { selectCurrentUser, selectLogout } from "@src/store/auth.store";
import { StartupModal } from "@components/modals/startupModal/StartupModal";
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { selectMenues } from "@src/store/configuration.store";
import { isValidArray } from "@utils/functions/isValidArray";
import { MenueItem } from "./components/MenueItem";

export interface SidemenuProps {
  sidemenuOpen: boolean;
  setSidemenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidemenu = ({ sidemenuOpen, setSidemenuOpen }: SidemenuProps) => {
  const { t } = useTranslation();
  const logout = useGlobalStore(selectLogout);
  const currentUser = useGlobalStore(selectCurrentUser);
  const [isStartupModalOpen, setIsStartupModalOpen] = React.useState(false);
  const loadedMenues = useGlobalStore(selectMenues);

  const menueItems = React.useMemo(() => {
    const items = [];

    if (isValidArray(loadedMenues?.main_navigation)) {
      items.push(...loadedMenues.main_navigation);
    }

    if (isValidArray(loadedMenues?.secondary_navigation)) {
      items.push(...loadedMenues.secondary_navigation);
    }

    return items;
  }, [loadedMenues?.main_navigation, loadedMenues?.secondary_navigation]);

  return (
    <>
      <Drawer
        open={sidemenuOpen}
        onClose={() => setSidemenuOpen(false)}
        sx={sidemenuStyles}
      >
        <Box className="sidemenu-header">
          <Stack className="header-left">
            <ThemeSelect></ThemeSelect>
          </Stack>

          {!!currentUser?.data?.isLoggedIn && (
            <Stack className="header-center user-box">
              <Avatar />
              <Box className="name">
                {currentUser.data.nickname || currentUser.data.name}
              </Box>
            </Stack>
          )}

          <Stack className="header-right">
            <IconButton
              id="close-icon"
              sx={{ position: "initial" }}
              onClick={() => setSidemenuOpen(false)}
            >
              <CloseIcon></CloseIcon>
            </IconButton>
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

        {!!menueItems?.length && (
          <Box className="nav-container">
            <Typography className="nav-title">{t("header.menue")}</Typography>

            <List component="nav" className="navigation-list">
              {menueItems.map((item) => (
                <MenueItem key={item.id} item={item}></MenueItem>
              ))}
            </List>
          </Box>
        )}

        <hr />

        <List component="nav" className="navigation-list">
          <ListItem>
            <ListItemButton component={Link} to="/settings">
              {t("sidemenu.settings")}
            </ListItemButton>
          </ListItem>

          <ListItem>
            {currentUser?.data?.isLoggedIn ? (
              <ListItemButton
                onClick={() => {
                  logout();
                }}
              >
                {t("auth.logout")}
              </ListItemButton>
            ) : (
              <ListItemButton
                onClick={() => {
                  setIsStartupModalOpen(true);
                  setSidemenuOpen(false);
                }}
              >
                {t("auth.login")}
              </ListItemButton>
            )}
          </ListItem>
        </List>
      </Drawer>

      {!!isStartupModalOpen && (
        <StartupModal
          setIsStartupModalOpen={setIsStartupModalOpen}
        ></StartupModal>
      )}
    </>
  );
};
