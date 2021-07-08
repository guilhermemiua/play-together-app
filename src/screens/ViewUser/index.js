import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { COLORS, METRICS, normalize } from '../../constants';
import Text from '../../components/Text';
import Button from '../../components/Button';
import DefaultProfileImage from '../../assets/images/DefaultProfile.png';
import Divider from '../../components/Divider';
import { getImage } from '../../helpers';
import { sendFriendRequest } from '../../services';

export default function ViewUser({ route }) {
  const { t } = useTranslation();
  const { user } = route.params;

  const handleSendFriendRequest = async () => {
    try {
      await sendFriendRequest(user.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) console.log(user);
  }, [user]);

  return (
    <View style={styles.viewUser}>
      <Image
        source={
          user?.profile_image
            ? {
                uri: getImage(user.profile_image),
              }
            : DefaultProfileImage
        }
        style={{
          width: '100%',
          height: normalize(250),
        }}
      />

      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Text bold>{t('viewUser.ageLabel')}: </Text>

          <Text>{user?.age}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: normalize(5),
          }}
        >
          <Text bold>{t('viewUser.cityStateLabel')}: </Text>

          <Text>
            {user?.city?.name}, {user?.state?.name}
          </Text>
        </View>

        <Divider />

        <Button title="Send friend request" onPress={handleSendFriendRequest} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUser: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  container: {
    paddingVertical: METRICS.containerMarginVertical,
    paddingHorizontal: METRICS.containerMarginHorizontal,
    backgroundColor: COLORS.white,
  },
});
