import React from 'react';

import { StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, METRICS, normalize } from '../../constants';
import ProfileImage from '../../assets/images/Profile.jpg';
import Title from '../Title';

export default function UserItem({ user = {} }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: METRICS.containerMarginHorizontal,
        paddingVertical: METRICS.padding,
      }}
    >
      <Image
        source={ProfileImage}
        style={{
          width: normalize(45),
          height: normalize(45),
          borderRadius: normalize(45),
          marginRight: normalize(10),
        }}
      />

      <Title h4 color={COLORS.black}>
        {user.name}
      </Title>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    borderRadius: METRICS.borderRadius,
    backgroundColor: COLORS.white,
    paddingHorizontal: METRICS.padding,
    paddingVertical: normalize(METRICS.padding * 2),
    width: '100%',
    marginTop: normalize(METRICS.margin / 2),
  },
  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  divider: {
    width: 0.5,
    height: '100%',
    backgroundColor: COLORS.borderColor,
  },
  info: {
    minWidth: normalize(180),
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoItemText: {
    marginLeft: normalize(5),
  },
});
