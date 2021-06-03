import React from 'react';
import { Input } from 'react-native-elements';
import { COLORS } from '../../constants';

export default function InputComponent({
  placeholder = '',
  leftIcon,
  onChangeText,
  containerStyle,
  errorMessage,
  ...props
}) {
  return (
    <Input
      placeholder={placeholder}
      leftIcon={leftIcon}
      // errorMessage={errorMessage}
      renderErrorMessage={false}
      onChangeText={onChangeText}
      inputContainerStyle={{
        borderColor: COLORS.black,
      }}
      containerStyle={[
        {
          paddingHorizontal: 0,
          paddingVertical: 0,
          marginVertical: 0,
          padding: 0,
          margin: 0,
        },
        containerStyle,
      ]}
      {...props}
    />
  );
}
