import React from 'react';
import { Input as ElementsInput } from 'react-native-elements';
import { COLORS, METRICS } from '../../constants';

export default function Input({
  placeholder = '',
  leftIcon,
  onChangeText,
  containerStyle,
  errorMessage,
  ...props
}) {
  return (
    <ElementsInput
      placeholder={placeholder}
      leftIcon={leftIcon}
      // errorMessage={errorMessage}
      renderErrorMessage={false}
      onChangeText={onChangeText}
      inputStyle={{
        fontFamily: METRICS.fontFamilyRegular,
        fontSize: METRICS.inputFontSize,
        color: COLORS.black,
      }}
      inputContainerStyle={{
        borderBottomWidth: 0,
      }}
      containerStyle={[
        {
          paddingHorizontal: 0,
          paddingVertical: 0,
          marginVertical: 0,
          padding: 0,
          margin: 0,
          borderWidth: 1,
          borderColor: COLORS.borderColor,
          borderRadius: METRICS.borderRadius,
          paddingLeft: 10,
          backgroundColor: COLORS.white,
        },
        containerStyle,
      ]}
      {...props}
    />
  );
}
