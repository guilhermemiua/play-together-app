import React from 'react';
import { Text } from 'react-native';
import { METRICS } from '../../constants';

export default function ErrorMessageComponent({ children }) {
  return (
    <Text
      style={{
        color: 'red',
        display: children ? 'flex' : 'none',
        fontFamily: METRICS.fontFamilyRegular,
        fontSize: METRICS.fontSize,
      }}
    >
      {children}
    </Text>
  );
}
