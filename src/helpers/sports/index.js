import i18next from 'i18next';

const SPORTS_OBJECT = {};

function updateTranslations() {
  SPORTS_OBJECT.soccer = {
    icon: {
      name: 'sports-soccer',
      type: 'material',
    },
    name: i18next?.t('sports.soccer'),
  };
  SPORTS_OBJECT.basketball = {
    icon: {
      name: 'sports-basketball',
      type: 'material',
    },
    name: i18next?.t('sports.basketball'),
  };
  SPORTS_OBJECT.tennis = {
    icon: {
      name: 'sports-tennis',
      type: 'material',
    },
    name: i18next?.t('sports.tennis'),
  };
  SPORTS_OBJECT.table_tennis = {
    icon: {
      name: 'table-tennis',
      type: 'material-community',
    },
    name: i18next?.t('sports.tableTennis'),
  };
  SPORTS_OBJECT.volleyball = {
    icon: {
      name: 'sports-volleyball',
      type: 'material',
    },
    name: i18next?.t('sports.volleyball'),
  };
  SPORTS_OBJECT.football = {
    icon: {
      name: 'sports-football',
      type: 'material',
    },
    name: i18next?.t('sports.football'),
  };
  SPORTS_OBJECT.baseball = {
    icon: {
      name: 'sports-baseball',
      type: 'material',
    },
    name: i18next?.t('sports.baseball'),
  };
  SPORTS_OBJECT.golf = {
    icon: {
      name: 'sports-golf',
      type: 'material',
    },
    name: i18next?.t('sports.golf'),
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

const getSportIconName = (sport) => SPORTS_OBJECT[sport]?.icon?.name || '';

const getSportIconType = (sport) => SPORTS_OBJECT[sport]?.icon?.type || '';

const getSportName = (sport) => SPORTS_OBJECT[sport]?.name || '';

export { getSportIconName, getSportIconType, getSportName };
