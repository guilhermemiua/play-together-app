import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { COLORS } from '../../../constants';
import SportList from '../../../components/SportList';

export default function ChooseSport({ navigation: { navigate } }) {
  const { t } = useTranslation();

  return (
    <View style={styles.sports}>
      <SportList navigate={navigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  sports: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
});
