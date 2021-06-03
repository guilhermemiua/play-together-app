import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import { COLORS, METRICS } from '../../../constants';
import { useAuth } from '../../../contexts/AuthContext';

export default function Settings({ navigation: { navigate } }) {
  const { logout } = useAuth();

  return (
    <View style={styles.settings}>
      <TouchableOpacity style={styles.settingsItem} onPress={logout}>
        <Text style={styles.settingsItemText}>Logout</Text>
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
    borderBottomColor: COLORS.black,
    paddingVertical: METRICS.padding * 2,
    backgroundColor: COLORS.white,
  },
  settingsItemText: {
    textAlign: 'center',
    fontSize: METRICS.fontSize * 1,
  },
});
