import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// import translationEN from "./locales/en/translation.json";
// import translationFR from "./locales/fr/translation.json";

import translationEN from "../translations/en.json";

const resources = {
  en: {
    translation: translationEN,
  },
};

i18n
  .use(LanguageDetector) // detect browser language
  .use(initReactI18next) // pass i18n to react-i18next
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already escapes
    },
  });

export default i18n;
