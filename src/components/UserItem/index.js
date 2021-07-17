import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { normalize, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import DefaultProfileImage from '../../assets/images/DefaultProfile.png';
import { COLORS, METRICS } from '../../constants';
import { getImage } from '../../helpers';
import Title from '../Title';
import { useAuth } from '../../hooks';

export default function UserItem({
  user,
  onPress,
  borderTop,
  bordered = false,
  owner = false,
  canDelete = false,
  handleDelete,
  RightIcon,
}) {
  const { t } = useTranslation();
  const { loggedUser } = useAuth();
  const navigation = useNavigation();

  const navigateToViewUser = () => {
    navigation.navigate('ViewUser', {
      title: `${user?.first_name} ${user?.last_name}`,
      user,
    });
  };

  return (
    <View
      style={[
        styles.user,
        borderTop && {
          borderColor: COLORS.borderColor,
          borderTopWidth: normalize(1),
        },
        bordered && {
          borderColor: COLORS.borderColor,
          borderRadius: METRICS.borderRadius,
          borderBottomWidth: normalize(1),
        },
      ]}
    >
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={
          loggedUser?.id !== user?.id ? onPress || navigateToViewUser : () => {}
        }
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

      {RightIcon && <RightIcon />}
    </View>
  );
}

const styles = StyleSheet.create({
  user: {
    backgroundColor: COLORS.white,
    paddingVertical: METRICS.padding,
    paddingHorizontal: METRICS.padding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
