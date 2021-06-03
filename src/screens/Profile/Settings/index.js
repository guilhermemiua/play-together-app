import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

import { COLORS, METRICS } from '../../../constants';
import { useAuth } from '../../../contexts/AuthContext';
import ChangeLanguageModal from './ChangeLanguageModal';

export default function Settings({ navigation: { navigate } }) {
  const { logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const toggleChangeLanguageModal = () => setIsOpen(!isOpen);

  return (
    <View style={styles.settings}>
      <TouchableOpacity
        style={styles.settingsItem}
        onPress={toggleChangeLanguageModal}
      >
        <Text style={styles.settingsItemText}>Change Language</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsItem} onPress={logout}>
        <Text style={styles.settingsItemText}>Logout</Text>
      </TouchableOpacity>

      <ChangeLanguageModal isOpen={isOpen} toggle={toggleChangeLanguageModal} />
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
