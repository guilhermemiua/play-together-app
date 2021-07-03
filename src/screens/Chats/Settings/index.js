import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

import { COLORS, METRICS } from '../../../constants';
import { useAuth } from '../../../hooks';

export default function Settings({ navigation }) {
  const { t } = useTranslation();
  const { logout } = useAuth();

  const navigateToChangePassword = () => navigation.navigate('ChangePassword');
  const navigateToChangeEmail = () => navigation.navigate('ChangeEmail');

  return (
    <View style={styles.settings}>
      <TouchableOpacity
        style={styles.settingsItem}
        onPress={navigateToChangePassword}
      >
        <Text style={styles.settingsItemText}>
          {t('settings.changePassword')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingsItem}
        onPress={navigateToChangeEmail}
      >
        <Text style={styles.settingsItemText}>{t('settings.changeEmail')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingsItem} onPress={logout}>
        <Text style={styles.settingsItemText}>{t('settings.logout')}</Text>
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
