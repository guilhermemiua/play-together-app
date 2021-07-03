import React from 'react';
import { Text } from 'react-native';
import { COLORS, METRICS } from '../../constants';

export default function Label({ children }) {
  return (
    <Text
      style={{
        color: COLORS.black,
        marginBottom: 5,
        fontFamily: METRICS.fontFamilyBold,
        fontSize: METRICS.fontSize,
      }}
    >
      {children}
    </Text>
  );
}
