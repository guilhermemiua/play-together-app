import React from 'react';
import PickerSelect from 'react-native-picker-select';
import { Platform } from 'react-native';
import { normalize } from 'react-native-elements';
import { COLORS, METRICS } from '../../constants';

const Select = ({ items, value, onValueChange, selectRef, ...props }) => (
  <PickerSelect
    {...props}
    ref={selectRef}
    placeholder={{
      label: '',
      value: null,
    }}
    value={value}
    items={items}
    onValueChange={onValueChange}
    style={{
      inputAndroid: {
        fontSize: METRICS.fontSize,
        color: COLORS.black,
        height: normalize(40),
        borderWidth: 1,
        borderRadius: METRICS.borderRadius,
        borderColor: COLORS.borderColor,
        fontFamily: METRICS.fontFamilyRegular,
        paddingLeft: 10,
        backgroundColor: COLORS.white,
      },
      inputIOS: {
        fontSize: METRICS.fontSize,
        color: COLORS.black,
        height: normalize(40),
        borderWidth: 1,
        borderRadius: METRICS.borderRadius,
        borderColor: COLORS.borderColor,
        fontFamily: METRICS.fontFamilyRegular,
        paddingLeft: 10,
        backgroundColor: COLORS.white,
      },
      placeholder: {
        color: COLORS.black,
        fontSize: METRICS.fontSize,
        fontFamily: METRICS.fontFamilyRegular,
      },
      viewContainer: {
        marginHorizontal: METRICS.padding,
      },
    }}
    textInputProps={Platform.select({
      android: {},
      ios: {},
    })}
    useNativeAndroidPickerStyle={false}
  />
);

export default Select;
