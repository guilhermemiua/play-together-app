import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-elements';
import i18next from 'i18next';

import { COLORS, LANGUAGES_ARRAY, METRICS } from '../../../../constants';

import TextComponent from '../../../../components/Text';
import Modal from '../../../../components/Modal';
import { setLanguageToAsyncStorage } from '../../../../helpers';
import { useLoader } from '../../../../hooks';

export default function ChangeLanguageModal({ isOpen, toggle, navigation }) {
  const { t } = useTranslation();
  const { setLoading } = useLoader();

  const changeLanguage = async (language) => {
    try {
      setLoading(true);

      await setLanguageToAsyncStorage(language);
      await i18next.changeLanguage(language);

      setLoading(false);

      // Changing navigation title due to not updating automatically when the language is changed
      await navigation.setParams({
        title: i18next.t('routes.settings'),
      });
    } catch (error) {
      setLoading(false);
    }
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
