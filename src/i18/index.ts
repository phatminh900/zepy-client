import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { resources } from "./resources.i18";
import { getItem } from "src/utils/browser.util";
import { LocalStorage } from "src/constants/browser.constant";

const language = getItem(LocalStorage.language) || "en";
export const defaultNS = "signUp";
i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .init({
    defaultNS,
    debug: true,
    lng: language,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
  });

export default i18n;
