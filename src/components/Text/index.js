import React from 'react';
import { Text } from 'react-native';
import { COLORS, METRICS } from '../../constants';

export default function TextComponent({
  children,
  style,
  color = COLORS.black,
}) {
  return (
    <Text
      style={[
        {
          color,
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
