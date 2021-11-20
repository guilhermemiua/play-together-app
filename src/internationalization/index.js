import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import ptBR from './languages/pt-BR';
import enUS from './languages/en-US';
import { getLanguage } from '../helpers';

const i18nextReactNative = {
  init: Function.prototype,
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    const lng = await getLanguage();

    if (!lng) {
      return callback(Localization.locale);
    }

    return callback(lng);
  },
  cacheUserLanguage: Function.prototype,
};
const resources = {
  'pt-BR': ptBR,
  'en-US': enUS,
};

i18n
  .use(i18nextReactNative)
  .use(initReactI18next)
  .init({
    initImmediate: false,
    resources,
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
