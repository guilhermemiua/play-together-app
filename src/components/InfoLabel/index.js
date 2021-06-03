import React from 'react';
import { Text } from 'react-native';
import { COLORS, METRICS } from '../../constants';

export default function InfoLabelComponent({ children }) {
  return (
    <Text
      style={{
        fontWeight: 'bold',
        color: COLORS.black,
        fontFamily: METRICS.fontFamilyBold,
      }}
    >
      {children}:{' '}
    </Text>
  );
}
