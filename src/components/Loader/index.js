import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from '../../constants';

function Loader() {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        opacity: 0.5,
        backgroundColor: COLORS.white,
      }}
    >
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
}

export default Loader;
