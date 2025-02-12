import { MfLogo } from "@components/mfLogo/MfLogo";
import { footerStyles } from "./footer.styles";
import { SectionSpacer } from "@components/sectionSpacer/SectionSpacer";
import LanguageIcon from "@mui/icons-material/Language";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YoutubeIcon from "@mui/icons-material/YouTube";
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Trans, useTranslation } from "react-i18next";
import Lottie from "react-lottie";
import heartAnimation from "@assets/lotties/heart.json";
import { useCurrentDate } from "@utils/hooks/useCurrentDate";
import { Link as TanstackLink } from "@tanstack/react-router";
import {
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  Paper,
} from "@mui/material";
import { useGlobalStore } from "@src/store/global.store";
import { selectMenues } from "@src/store/configuration.store";
import { isValidArray } from "@utils/functions/isValidArray";

const heartAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: heartAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export function Footer() {
  const { t } = useTranslation();

  const currentDate = useCurrentDate(1000 * 60);

  const loadedMenues = useGlobalStore(selectMenues);
  const tertiaryNavigation = loadedMenues?.tertiary_navigation;

  return (
    <Box className="footer-wrapper" sx={footerStyles}>
      <Paper
        color="neutral"
        component="footer"
        role="footer"
        className="footer"
      >
        <Box component={TanstackLink} to="/">
          <MfLogo layout="vertical"></MfLogo>
        </Box>

        <p>{t("footer.description")}</p>
        <Button
          variant="contained"
          color="primary"
          size="large"
          href="#mitglied-werden"
        >
          {t("footer.cta")}
        </Button>

        <div className="mobile-reach-out">
          <strong>{t("footer.external")}</strong>

          <div className="social-actions">
            <IconButton component="a" href="https://www.musical-fabrik.de">
              <LanguageIcon></LanguageIcon>
            </IconButton>
            <IconButton
              component="a"
              target="_blank"
              href="https://www.facebook.com/musicalfabrik"
            >
              <FacebookIcon></FacebookIcon>
            </IconButton>
            <IconButton
              component="a"
              target="_blank"
              href="https://www.instagram.com/musicalfabrik/"
            >
              <InstagramIcon></InstagramIcon>
            </IconButton>
            <IconButton
              component="a"
              target="_blank"
              href="https://www.youtube.com/channel/UCluu4BuDfn4dChkFBPpQt0g"
            >
              <YoutubeIcon></YoutubeIcon>
            </IconButton>
          </div>
        </div>

        <div className="from-container">
          <Trans
            i18nKey="footer.by"
            components={{
              a: (
                <Link
                  className="ext-link"
                  color="primary"
                  underline="always"
                  href="https://www.sebi.dev"
                  target="_blank"
                />
              ),
              // heart: <FavoriteBorderIcon />,
              heart: (
                <Lottie
                  options={heartAnimationOptions}
                  height={"3em"}
                  width={"3.5em"}
                  style={{ margin: " 0 -16px 0 -16px" }}
                />
              ),
            }}
          ></Trans>
        </div>

        <hr />

        <div className="bottom-wrapper">
          {isValidArray(tertiaryNavigation) && !!tertiaryNavigation.length && (
            <List className="nav-list tertiary-navigation">
              {tertiaryNavigation.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    component={TanstackLink}
                    to={item?.page?.url || item.link}
                    hash={item.section}
                  >
                    <Box
                      component="span"
                      className="nav-item-title"
                      dangerouslySetInnerHTML={{
                        __html: item.title || item?.page?.title || "",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}

          <div className="copyright">
            {t("footer.copyright", { year: currentDate.getFullYear() })}
          </div>
        </div>
      </Paper>

      <SectionSpacer position="top"></SectionSpacer>
    </Box>
  );
}
