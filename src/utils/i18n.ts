import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from '../localize.json';

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    lng: localStorage.getItem("locale") || "en",
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;