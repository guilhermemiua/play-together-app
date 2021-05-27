import React from 'react';
import { View, StyleSheet } from 'react-native';
import { METRICS, SCREEN_WIDTH } from '../../constants';

export default function Container({
  children,
  style,
  justifyContent = 'center',
}) {
  return (
    <View
      style={[
        styles.container,
        {
          justifyContent,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: METRICS.margin * 2,
  },
});
