import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

import { Icon } from 'react-native-elements';
import { COLORS, LANGUAGES_ARRAY, METRICS } from '../../../../constants';

import TextComponent from '../../../../components/Text';
import Modal from '../../../../components/Modal';
import { setLanguageToAsyncStorage } from '../../../../helpers';

export default function ChangeLanguageModal({ isOpen, toggle, navigation }) {
  const { t } = useTranslation();

  const changeLanguage = async (language) => {
    await setLanguageToAsyncStorage(language);
    await i18next.changeLanguage(language);

    // Changing navigation title due to not updating automatically when the language is changed
    await navigation.setParams({
      title: i18next.t('routes.settings'),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      title={t('changeLanguageModal.title')}
    >
      {LANGUAGES_ARRAY.map((language) => (
        <TouchableOpacity
          style={styles.languageItem}
          key={language.value}
          onPress={() => changeLanguage(language.value)}
        >
          <TextComponent>{language.name}</TextComponent>
          {i18next.language === language.value && (
            <Icon
              name="check"
              type="feather"
              color={COLORS.primary}
              size={25}
            />
          )}
        </TouchableOpacity>
      ))}
    </Modal>
  );
}

const styles = StyleSheet.create({
  languageItem: {
    paddingVertical: METRICS.padding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
