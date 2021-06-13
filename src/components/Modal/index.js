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
      overlayStyle={{
        width: `${widthPercentage}%`,
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
