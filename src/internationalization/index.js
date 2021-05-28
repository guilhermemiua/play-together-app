import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import pt from './languages/pt';
import en from './languages/en';

const i18nextReactNative = {
  init: Function.prototype,
  type: 'languageDetector',
  detect: () => Localization.locale,
  cacheUserLanguage: Function.prototype,
};
const resources = {
  pt,
  en,
};

i18n
  .use(i18nextReactNative)
  .use(initReactI18next)
  .init({
    initImmediate: false,
    resources,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
