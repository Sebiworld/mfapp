import { MfLogo } from "@components/mfLogo/MfLogo";
import { footerStyles } from "./footer.styles";
import { SectionSpacer } from "@components/sectionSpacer/SectionSpacer";
import LanguageIcon from "@mui/icons-material/Language";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YoutubeIcon from "@mui/icons-material/YouTube";
import { Trans, useTranslation } from "react-i18next";
import { useCurrentDate } from "@utils/hooks/useCurrentDate";
import { Box, Button, IconButton, Link, List, Paper } from "@mui/material";
import { useGlobalStore } from "@src/store/global.store";
import { isValidArray } from "@utils/functions/isValidArray";
import { useCallback, useId } from "react";
import { useReward } from "react-rewards";
import { Link as RouterLink } from "react-router";
import { selectMenues } from "@src/store/configuration/configuration.selectors";
import { ToolbarNavItem } from "@components/ToolbarNavItem";
import { FooterHeart } from "./heart/FooterHeart";

export const Footer = () => {
  const { t } = useTranslation();

  const currentDate = useCurrentDate(1000 * 60);

  const rewardId = useId();
  const { reward, isAnimating: isRewardAnimating } = useReward(
    rewardId,
    "balloons",
    {
      position: "absolute",
    }
  );
  const triggerReward = useCallback(() => {
    if (isRewardAnimating) {
      return;
    }
    reward();
  }, [isRewardAnimating, reward]);

  const loadedMenues = useGlobalStore(selectMenues);
  const tertiaryNavigation = loadedMenues?.tertiary_navigation;

  return (
    <Box className="footer-wrapper" sx={footerStyles}>
      <Paper color="neutral" component="footer" className="footer">
        <Box component={RouterLink} to="/" aria-label={t("footer.home_link")}>
          <MfLogo layout="vertical"></MfLogo>
        </Box>

        <p>{t("footer.description")}</p>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink}
          to={{ pathname: "/", hash: "#mitglied-werden" }}
          title="Mitglied werden"
        >
          {t("footer.cta")}
        </Button>

        <div className="mobile-reach-out">
          <strong>{t("footer.external")}</strong>

          <div className="social-actions">
            <IconButton
              component="a"
              href="https://www.musical-fabrik.de"
              title="Die Musical-Fabrik Website"
            >
              <LanguageIcon></LanguageIcon>
            </IconButton>

            <IconButton
              component="a"
              target="_blank"
              href="https://www.facebook.com/musicalfabrik"
              title="Die Musical-Fabrik auf Facebook"
            >
              <FacebookIcon></FacebookIcon>
            </IconButton>

            <IconButton
              component="a"
              target="_blank"
              href="https://www.instagram.com/musicalfabrik/"
              title="Die Musical-Fabrik auf Instagram"
            >
              <InstagramIcon></InstagramIcon>
            </IconButton>

            <IconButton
              component="a"
              target="_blank"
              href="https://www.youtube.com/channel/UCluu4BuDfn4dChkFBPpQt0g"
              title="Die Musical-Fabrik auf Youtube"
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
                  key="link"
                  title="Zur Website von Sebastian Schendel"
                />
              ),
              heart: <FooterHeart />,
            }}
          ></Trans>
        </div>

        <hr />

        <div className="bottom-wrapper">
          {isValidArray(tertiaryNavigation) && !!tertiaryNavigation.length && (
            <List className="nav-list tertiary-navigation">
              {tertiaryNavigation.map((item) => (
                <ToolbarNavItem key={item.id} item={item} />
              ))}
            </List>
          )}

          <div className="copyright" onClick={triggerReward}>
            {t("footer.copyright", { year: currentDate.getFullYear() })}
            <span id={rewardId} />
          </div>
        </div>
      </Paper>

      <SectionSpacer position="top"></SectionSpacer>
    </Box>
  );
};
