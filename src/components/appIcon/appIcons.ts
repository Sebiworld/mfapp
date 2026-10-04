import {
  alertCircle,
  arrowForward,
  calendar,
  checkmarkCircle,
  chevronForward,
  informationCircle,
  informationCircleOutline,
  link,
  logoFacebook,
  logoInstagram,
  logoTwitter,
  logoWhatsapp,
  logoYoutube,
  ticket,
  warning,
} from "ionicons/icons";

/**
 * Icons that may be requested by name, either from code or from backend content
 * (menu `ionicon`, alert `icon`, share links). Only these are bundled.
 */
export const APP_ICONS: Record<string, string> = {
  "alert-circle": alertCircle,
  "arrow-forward": arrowForward,
  calendar,
  "checkmark-circle": checkmarkCircle,
  "chevron-forward": chevronForward,
  "information-circle": informationCircle,
  link,
  "logo-facebook": logoFacebook,
  "logo-instagram": logoInstagram,
  "logo-twitter": logoTwitter,
  "logo-whatsapp": logoWhatsapp,
  "logo-youtube": logoYoutube,
  ticket,
  warning,
};

/** Shown when a requested name is not part of `APP_ICONS`. */
export const FALLBACK_ICON: string = informationCircleOutline;

/**
 * Maps an icon name to its SVG source.
 * @param name Icon name in kebab-case; a leading `ion-` prefix is ignored.
 * @returns The registered icon, or the fallback icon for unknown or empty names.
 */
export const resolveIcon = (name?: string | null): string => {
  if (!name) {
    return FALLBACK_ICON;
  }

  const key = name.trim().replace(/^ion-/, "");

  return Object.hasOwn(APP_ICONS, key) ? APP_ICONS[key] : FALLBACK_ICON;
};
