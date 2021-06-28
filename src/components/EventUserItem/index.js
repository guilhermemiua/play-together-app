import React from 'react';

import { StyleSheet, Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { COLORS, METRICS, normalize } from '../../constants';
import DefaultProfileImage from '../../assets/images/DefaultProfile.png';
import Title from '../Title';
import { getImage } from '../../helpers';

export default function EventUserItem({
  user = {},
  owner = false,
  canDelete = false,
  handleDelete,
}) {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.touchableOpacity}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Image
          source={
            user?.profile_image
              ? {
                  uri: getImage(user.profile_image),
                }
              : DefaultProfileImage
          }
          style={styles.profileImage}
        />

        <Title h4 color={COLORS.black}>
          {user.first_name} {user.last_name}
        </Title>
      </View>

      {owner && (
        <Title h4 color={COLORS.primary}>
          {t('viewEvent.userItem.hostLabel')}
        </Title>
      )}

      {canDelete && !owner && (
        <TouchableOpacity onPress={handleDelete}>
          <Title h4 color={COLORS.danger}>
            {t('viewEvent.userItem.removeLabel')}
          </Title>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: METRICS.containerMarginHorizontal,
    paddingVertical: METRICS.padding,
    justifyContent: 'space-between',
  },
  profileImage: {
    width: normalize(45),
    height: normalize(45),
    borderRadius: normalize(45),
    marginRight: normalize(10),
  },
});
