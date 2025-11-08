import * as React from "react";
import ThemeSelect from "@components/ThemeSelect";
import { sidemenuStyles } from "./sidemenu.styles";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "@src/store/global.store";
import { selectCurrentUser, selectLogout } from "@src/store/auth.store";
import { StartupModal } from "@components/modals/startupModal/StartupModal";
import {
  Avatar,
  Box,
  Button,
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
import { NavLink, Link as RouterLink } from "react-router";
import { useCallback, useEffect, useMemo } from "react";
import { MfLogo } from "@components/mfLogo/MfLogo";
import { SectionSpacer } from "@components/sectionSpacer/SectionSpacer";
import { ProfileCard } from "./components/ProfileCard";

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

  useEffect(() => {
    console.log("CurrentUser:", currentUser);
  }, [currentUser]);

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

  const closeSidemenu = useCallback(() => {
    setSidemenuOpen(false);
  }, [setSidemenuOpen]);

  const isVereinsmitglied = useMemo(
    () => currentUser?.data?.roles?.some((role) => role?.name === "mitglied"),
    [currentUser]
  );

  return (
    <>
      <Drawer open={sidemenuOpen} onClose={closeSidemenu} sx={sidemenuStyles}>
        <Box className="sidemenu-header">
          <Stack className="header-left">
            <ThemeSelect></ThemeSelect>
          </Stack>

          <Stack className="header-right">
            <IconButton
              id="close-icon"
              sx={{ position: "initial" }}
              onClick={closeSidemenu}
            >
              <CloseIcon></CloseIcon>
            </IconButton>
          </Stack>
        </Box>

        {!!currentUser?.data?.isLoggedIn && (
          // <Stack className="header-center user-box">
          //   <Avatar />
          //   <Box className="name">
          //     {currentUser.data.nickname || currentUser.data.name}
          //   </Box>
          // </Stack>

          <Box className="sidemenu-subheader">
            <ProfileCard user={currentUser.data}></ProfileCard>
          </Box>
        )}

        <Box className="sidemenu-content">
          {!!menueItems?.length && (
            <Box className="nav-container">
              <Typography className="nav-title">
                {t("sidemenu.menu")}
              </Typography>

              <List component="nav" className="navigation-list">
                <ListItem>
                  <ListItemButton
                    component={NavLink}
                    to="/shop"
                    disabled
                    onClick={closeSidemenu}
                  >
                    Merch-Shop
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton
                    component={NavLink}
                    to="/events"
                    disabled
                    onClick={closeSidemenu}
                  >
                    Probenplan
                  </ListItemButton>
                </ListItem>

                {menueItems.map((item) => (
                  <MenueItem
                    key={item.id}
                    item={item}
                    onClick={closeSidemenu}
                  ></MenueItem>
                ))}

                {menueItems.map((item) => (
                  <MenueItem
                    key={item.id}
                    item={item}
                    onClick={closeSidemenu}
                  ></MenueItem>
                ))}

                {menueItems.map((item) => (
                  <MenueItem
                    key={item.id}
                    item={item}
                    onClick={closeSidemenu}
                  ></MenueItem>
                ))}
              </List>
            </Box>
          )}

          <hr />

          <List component="nav" className="navigation-list">
            {/* <ListItem>
            <ListItemButton component={NavLink} to="/settings">
              {t("sidemenu.settings")}
            </ListItemButton>
          </ListItem> */}

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
        </Box>

        <Box className="sidemenu-footer">
          <Box
            className="logo-container"
            component={RouterLink}
            to="/"
            onClick={closeSidemenu}
          >
            <MfLogo layout="vertical"></MfLogo>
          </Box>

          {isVereinsmitglied && (
            <Button
              variant="contained"
              color="primary"
              size="medium"
              component={RouterLink}
              to={{ pathname: "/", hash: "#mitglied-werden" }}
              onClick={closeSidemenu}
            >
              {t("footer.cta")}
            </Button>
          )}

          <SectionSpacer position="top"></SectionSpacer>
        </Box>
      </Drawer>

      {!!isStartupModalOpen && (
        <StartupModal
          setIsStartupModalOpen={setIsStartupModalOpen}
        ></StartupModal>
      )}
    </>
  );
};
