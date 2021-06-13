import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Button as ButtonElements } from 'react-native-elements';
import { METRICS } from '../../constants';

function Button({ style, type = 'solid', title, onPress, ...props }) {
  return (
    <ButtonElements
      containerStyle={{ flex: 1 }}
      buttonStyle={{
        paddingVertical: METRICS.padding,
        borderRadius: METRICS.borderRadius,
        ...style,
      }}
      TouchableComponent={TouchableOpacity}
      type={type}
      title={title}
      onPress={onPress}
      titleStyle={{
        fontSize: METRICS.fontSize,
        lineHeight: METRICS.fontSize + 1,
        fontFamily: METRICS.fontFamilyBold,
      }}
      {...props}
    />
  );
}

export default Button;
