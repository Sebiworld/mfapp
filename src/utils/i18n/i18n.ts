import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as deTranslations from "@src/assets/i18n/de.json";
import { z } from "zod";
import { makeZodI18nMap } from "zod-i18n-map";
import { zodTranslationMap } from "./zodTranslationMap";

const resources = {
  de: {
    translation: deTranslations,
    ...zodTranslationMap,
  },
};

i18n.use(initReactI18next).init({
  showSupportNotice: false,
  resources,
  lng: "de",

  interpolation: {
    escapeValue: false,
  },
});
z.setErrorMap(makeZodI18nMap({ ns: ["zod", "customZod"] }));

export { i18n, z as zod };
