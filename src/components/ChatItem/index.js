import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { normalize } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DefaultProfileImage from '../../assets/images/DefaultProfile.png';
import { COLORS, METRICS } from '../../constants';
import { getImage } from '../../helpers';
import Title from '../Title';

export default function ChatItem({ type, item, onPress, borderTop }) {
  return (
    <TouchableOpacity
      style={[
        styles.chat,
        borderTop && {
          borderColor: COLORS.borderColor,

          borderTopWidth: normalize(1),
        },
      ]}
      onPress={onPress}
    >
      {type === 'friend' && (
        <>
          <Image
            source={
              item?.profile_image
                ? {
                    uri: getImage(item.profile_image),
                  }
                : DefaultProfileImage
            }
            style={styles.chatImage}
          />
          <Title h4 color={COLORS.black} textAlign="left">
            {item?.first_name} {item?.last_name}
          </Title>
        </>
      )}
      {type === 'group' && (
        <>
          <Image
            source={
              item?.group_image
                ? {
                    uri: getImage(item.group_image),
                  }
                : DefaultProfileImage
            }
            style={styles.chatImage}
          />
          <Title h4 color={COLORS.black} textAlign="left">
            {item?.name}
          </Title>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chat: {
    backgroundColor: COLORS.white,
    paddingVertical: METRICS.padding,
    paddingHorizontal: METRICS.padding,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.borderColor,
    borderRadius: METRICS.borderRadius,
    borderBottomWidth: normalize(1),
  },
  chatImage: {
    width: normalize(45),
    height: normalize(45),
    borderRadius: normalize(45),
    borderColor: COLORS.borderColor,
    borderWidth: normalize(1),
    marginRight: normalize(10),
  },
});
