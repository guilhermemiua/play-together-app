import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { normalize } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DefaultProfileImage from '../../assets/images/DefaultProfile.png';
import { COLORS, METRICS } from '../../constants';
import { getImage } from '../../helpers';
import Title from '../Title';

export default function UserItem({ user, onPress, borderTop }) {
  return (
    <TouchableOpacity
      style={[
        styles.user,
        borderTop && {
          borderColor: COLORS.borderColor,

          borderTopWidth: normalize(1),
        },
      ]}
      onPress={onPress}
    >
      <Image
        source={
          user?.profile_image
            ? {
                uri: getImage(user.profile_image),
              }
            : DefaultProfileImage
        }
        style={styles.userImage}
      />
      <Title h4 color={COLORS.black} textAlign="left">
        {user.first_name} {user.last_name}
      </Title>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  user: {
    backgroundColor: COLORS.white,
    paddingVertical: METRICS.padding,
    paddingHorizontal: METRICS.padding,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.borderColor,
    borderRadius: METRICS.borderRadius,
    borderBottomWidth: normalize(1),
  },
  userImage: {
    width: normalize(45),
    height: normalize(45),
    borderRadius: normalize(45),
    borderColor: COLORS.borderColor,
    borderWidth: normalize(1),
    marginRight: normalize(10),
  },
});
