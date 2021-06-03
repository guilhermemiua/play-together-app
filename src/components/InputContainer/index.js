import React from 'react';
import { View } from 'react-native';
import { METRICS } from '../../constants';

export default function InputContainerComponent({ children, style }) {
  return (
    <View
      style={[
        {
          marginBottom: METRICS.margin,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
