import React from 'react';
import PickerSelect from 'react-native-picker-select';
import { Platform } from 'react-native';
import { COLORS, METRICS } from '../../constants';

const SelectInput = ({ items, value, onValueChange }) => (
  <PickerSelect
    placeholder={{
      label: '',
      value: null,
    }}
    items={items}
    selectedValue={value}
    onValueChange={onValueChange}
    style={{
      inputAndroid: {
        borderBottomWidth: 1,
        fontSize: METRICS.fontSize,
        color: COLORS.black,
        height: 40,
      },
      inputIOS: {
        borderBottomWidth: 1,
        fontSize: METRICS.fontSize,
        color: COLORS.black,
        height: 40,
      },
      placeholder: {
        color: COLORS.black,
        fontSize: METRICS.fontSize,
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

export default SelectInput;

// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import PickerSelect from 'react-native-picker-select';

// export default function Select({ items, value, onValueChange, style }) {
//   return (
//     <Picker
//       selectedValue={value}
//       onValueChange={onValueChange}
//       style={[styles.picker, style]}
//     >
//       {/* <Picker.Item label={i18n.t('picker.firstLabel')} value="0" /> */}
//       {items?.map((item) => (
//         <Picker.Item label={item.label} value={item.value} />
//       ))}
//     </Picker>
//   );
// }

// const styles = StyleSheet.create({
//   picker: {
//     borderColor: 'red',
//     borderWidth: 1,
//   },
// });
