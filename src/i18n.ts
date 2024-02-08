import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as deTranslations from '@src/assets/i18n/de.json';

const resources = {
  de: {
    translation: deTranslations
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "de",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;