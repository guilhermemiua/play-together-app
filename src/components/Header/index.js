import React from 'react';
import { View, StyleSheet } from 'react-native';
import { normalize } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { COLORS, METRICS } from '../../constants';
import Title from '../Title';

export default function Header({ style, title = '', icons = [] }) {
  return (
    <View style={[styles.header, style]}>
      <Title h3 style={{ color: COLORS.black }}>
        {title}
      </Title>
      <View>
        {icons.map((icon) => (
          <Icon
            key={icon.name}
            name={icon.name}
            type={icon.type}
            color={COLORS.black}
            size={25}
            onPress={icon.onPress}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: METRICS.margin,
    paddingVertical: METRICS.padding,
    borderBottomColor: COLORS.borderColor,
    borderBottomWidth: normalize(1),
    backgroundColor: COLORS.white,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
