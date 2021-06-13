import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon } from 'react-native-elements';

import i18next from '../../internationalization';
import { COLORS, METRICS, normalize } from '../../constants';
import Text from '../Text';
import { formatDateToLocale } from '../../helpers';

export default function DatePicker({ value, onChange }) {
  const [show, setShow] = useState(false);

  const onChangeDatePicker = (event, selectedDate) => {
    if (selectedDate) {
      onChange(selectedDate);
    }

    // setShow(false);
    setShow(Platform.OS === 'ios');
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <>
      <TouchableOpacity onPress={showDatepicker} style={styles.button}>
        <Icon name="clock" type="feather" color={COLORS.black} size={20} />
        <Text style={styles.buttonText}>
          {value && formatDateToLocale(value)}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value || new Date()}
          mode="date"
          locale={i18next.language}
          display="default"
          onChange={onChangeDatePicker}
          minimumDate={new Date()}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: COLORS.white,
    paddingLeft: normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderRadius: METRICS.borderRadius,
    borderColor: COLORS.borderColor,
  },
  buttonText: {
    fontFamily: METRICS.fontFamilyRegular,
    fontSize: METRICS.inputFontSize,
    marginLeft: normalize(5),
  },
});
