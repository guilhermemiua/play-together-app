import React from 'react';
import { Text } from 'react-native';
import { COLORS, METRICS } from '../../constants';

export default function TextComponent({ children, style }) {
  return (
    <Text
      style={[
        {
          color: COLORS.black,
          fontFamily: METRICS.fontFamilyRegular,
          fontSize: METRICS.fontSize,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
