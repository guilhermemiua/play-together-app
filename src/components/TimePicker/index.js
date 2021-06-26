import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon } from 'react-native-elements';
import i18next from '../../internationalization';
import { COLORS, METRICS, normalize } from '../../constants';
import Text from '../Text';
import { formatTimeToLocale } from '../../helpers';

export default function TimePicker({ value, onChange }) {
  const [show, setShow] = useState(false);

  const onChangeTimePicker = (event, selectedDate) => {
    // Must be here for not opening it twice
    setShow(Platform.OS === 'ios');

    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const showTimepicker = () => {
    setShow(true);
  };

  return (
    <>
      <TouchableOpacity onPress={showTimepicker} style={styles.button}>
        <Icon name="clock" type="feather" color={COLORS.black} size={20} />
        <Text style={styles.buttonText}>
          {value ? formatTimeToLocale(value) : ''}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value || new Date()}
          mode="time"
          locale={i18next.language}
          display="default"
          onChange={onChangeTimePicker}
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
