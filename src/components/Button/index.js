import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Button as ButtonElements } from 'react-native-elements';
import { METRICS } from '../../constants';

function Button({ style, type = 'solid', title, onPress, ...props }) {
  return (
    <ButtonElements
      buttonStyle={{
        paddingVertical: METRICS.padding,
        borderRadius: 0,
        ...style,
      }}
      TouchableComponent={TouchableOpacity}
      type={type}
      title={title}
      onPress={onPress}
      titleStyle={{
        fontSize: METRICS.fontSize,
        lineHeight: METRICS.fontSize + 1,
        fontWeight: 'bold',
      }}
      {...props}
    />
  );
}

export default Button;
