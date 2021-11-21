import i18next from 'i18next';

const LANGUAGES_ARRAY = [];

function updateTranslations() {
  LANGUAGES_ARRAY.push({
    name: i18next?.t('language.portuguese'),
    value: 'pt-BR',
  });
  LANGUAGES_ARRAY.push({
    name: i18next?.t('language.english'),
    value: 'en-US',
  });
}

// i18next seems ready -> initial fill translations
if (i18next.isInitialized) {
  updateTranslations();
}

// reset translations to new values on language change
i18next.on('languageChanged', (lng) => {
  updateTranslations();
});

// we loaded some translation file? reset needed?!?
// https://www.i18next.com/overview/api#store-events
i18next.on('loaded', (lng) => {
  updateTranslations();
});

export { LANGUAGES_ARRAY };
