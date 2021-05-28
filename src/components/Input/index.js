import React from 'react';
import { Input } from 'react-native-elements';
import { METRICS } from '../../constants';

export default function InputComponent({
  placeholder = '',
  label = '',
  leftIcon,
  onChangeText,
  styles,
  errorMessage,
  ...props
}) {
  return (
    <Input
      label={label}
      placeholder={placeholder}
      leftIcon={leftIcon}
      style={[styles]}
      inputContainerStyle={
        {
          // marginBottom: METRICS.margin,
        }
      }
      // renderErrorMessage={false}
      errorMessage={errorMessage}
      onChangeText={onChangeText}
      {...props}
    />
  );
}
