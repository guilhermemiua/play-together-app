import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { COLORS, METRICS } from '../../constants';

export default function Profile({ navigation: { navigate } }) {
  const navigateToSettings = () => navigate('Settings');

  return (
    <View style={styles.profile}>
      <Icon
        name="settings"
        type="feather"
        color={COLORS.black}
        size={30}
        containerStyle={styles.settingButton}
        onPress={navigateToSettings}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  settingButton: {
    alignItems: 'flex-end',
    marginTop: METRICS.margin,
    marginRight: METRICS.margin,
  },
});
