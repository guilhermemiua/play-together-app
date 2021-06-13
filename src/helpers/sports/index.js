import i18next from '../../internationalization';

const SPORTS_OBJECT = {};

function updateTranslations() {
  SPORTS_OBJECT.soccer = {
    icon: 'sports-soccer',
    name: i18next?.t('sports.soccer'),
  };
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

const getSportIcon = (sport) => SPORTS_OBJECT[sport]?.icon || '';

const getSportName = (sport) => SPORTS_OBJECT[sport]?.name || '';

export { getSportIcon, getSportName };
