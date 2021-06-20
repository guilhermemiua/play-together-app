import React from 'react';
import { View, StyleSheet } from 'react-native';

import { COLORS } from '../../../constants';
import SportList from '../../../components/SportList';

export default function ChooseSport({ navigation: { navigate } }) {
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
