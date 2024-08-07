import { MfLogo } from '@components/mfLogo/MfLogo';
import { Box, Button, IconButton, Link, Sheet } from '@mui/joy';
import { footerStyles } from './footer.styles';
import { SectionSpacer } from '@components/sectionSpacer/SectionSpacer';
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YoutubeIcon from '@mui/icons-material/YouTube';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import Lottie from 'react-lottie';
import heartAnimation from '@assets/lotties/heart.json';

export function Footer() {
  const heartAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: heartAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Box className="footer-wrapper" sx={footerStyles}>
      <Sheet variant="soft" color="neutral" component="footer" className="footer">
        <MfLogo></MfLogo>

        <p>{t('footer.description')}</p>
        <Button component="a" target="_blank" href="https://www.musical-fabrik.de/#mitglied-werden">
          {t('footer.cta')}
        </Button>

        <div className="mobile-reach-out">
          <strong>{t('footer.external')}</strong>

          <div className="social-actions">
            <IconButton component="a" target="_blank" href="https://www.musical-fabrik.de">
              <LanguageIcon></LanguageIcon>
            </IconButton>
            <IconButton component="a" target="_blank" href="https://www.facebook.com/musicalfabrik">
              <FacebookIcon></FacebookIcon>
            </IconButton>
            <IconButton component="a" target="_blank" href="https://www.instagram.com/musicalfabrik/">
              <InstagramIcon></InstagramIcon>
            </IconButton>
            <IconButton component="a" target="_blank" href="https://www.youtube.com/channel/UCluu4BuDfn4dChkFBPpQt0g">
              <YoutubeIcon></YoutubeIcon>
            </IconButton>
          </div>
        </div>

        <hr />
        <div className="bottom-wrapper">
          <div className="from-container">
            <Trans
              i18nKey="footer.by"
              components={{
                a: (
                  <Link
                    className="ext-link"
                    color="primary"
                    underline="always"
                    variant="plain"
                    href="https://www.sebi.dev"
                    target="_blank"
                  />
                ),
                // heart: <FavoriteBorderIcon />,
                heart: <Lottie options={heartAnimationOptions} height={'3em'} width={'2em'} />,
              }}
            ></Trans>
          </div>
          <div className="copyright">{t('footer.copyright')}</div>
        </div>
      </Sheet>

      <SectionSpacer position="top"></SectionSpacer>
    </Box>
  );
}
