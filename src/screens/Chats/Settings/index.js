import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

import { COLORS, METRICS } from '../../../constants';

export default function Settings({ navigation }) {
  const { t } = useTranslation();

  const navigateToNewChat = () => navigation.navigate('NewChat');
  const navigateToChangeEmail = () => navigation.navigate('ChangeEmail');

  return (
    <View style={styles.settings}>
      <TouchableOpacity style={styles.settingsItem} onPress={navigateToNewChat}>
        <Text style={styles.settingsItemText}>
          {t('chatsSettings.newChat')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingsItem}
        onPress={navigateToChangeEmail}
      >
        <Text style={styles.settingsItemText}>
          {t('chatsSettings.newGroupChat')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  settings: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  settingsItem: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
    paddingVertical: METRICS.padding * 1.8,
    backgroundColor: COLORS.white,
  },
  settingsItemText: {
    textAlign: 'center',
    fontSize: METRICS.fontSize * 1.2,
    fontFamily: METRICS.fontFamilyBold,
  },
});
