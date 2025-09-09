import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to Monastery360",
      search: "Search monasteries..."
    }
  },
  hi: {
    translation: {
      welcome: "मोनास्ट्री360 में आपका स्वागत है",
      search: "मठ खोजें..."
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
