import React from 'react';
import { StyleSheet, View } from 'react-native';

import { COLORS, METRICS, normalize } from '../../constants';

export default function Divider({ type = 'horizontal', color = COLORS.gray }) {
  return (
    <View
      style={[
        styles.divider,
        type === 'horizontal' ? styles.horizontal : styles.vertical,
        {
          backgroundColor: color,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  divider: {},
  horizontal: {
    height: normalize(3),
    marginVertical: normalize(20),
  },
  vertical: {
    width: normalize(3),
    marginHorizontal: normalize(20),
  },
});
