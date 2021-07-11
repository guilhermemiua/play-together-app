import React from 'react';
import { View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { COLORS, METRICS } from '../../constants';
import Title from '../Title';

export default function Modal({
  children,
  isOpen,
  toggle,
  widthPercentage = 90,
  title = '',
}) {
  return (
    <Overlay
      isVisible={isOpen}
      onBackdropPress={toggle}
      // fullScreen
      overlayStyle={{
        width: `${widthPercentage}%`,
        // justifyContent: 'center',
        // height: 300,
      }}
    >
      <View
        style={{
          paddingVertical: METRICS.padding,
        }}
      >
        <Title h4 style={{ color: COLORS.black }}>
          {title}
        </Title>
      </View>

      {children}
    </Overlay>
  );
}
