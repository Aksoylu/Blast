import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './translations/en.json';
import tr from './translations/tr.json';


declare global {
  interface Window {
    electronStore: {
      getLanguage: () => string;
      setLanguage: (key: string) => void;
    };
  }
}


const storedLanguage = window?.electronStore?.getLanguage() || 'en';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: storedLanguage,
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: { translation: en },
      tr: { translation: tr },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;


