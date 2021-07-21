import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-elements';
import { COLORS, METRICS, normalize } from '../../constants';
import Text from '../../components/Text';
import Button from '../../components/Button';
import DefaultProfileImage from '../../assets/images/DefaultProfile.png';
import Divider from '../../components/Divider';
import { getImage, notify } from '../../helpers';
import {
  cancelFriendRequest,
  getFriendStatus,
  getMyRating,
  removeMyFriend,
  sendFriendRequest,
} from '../../services';
import { useLoader } from '../../hooks';

export default function ViewUser({ route, navigation }) {
  const { t } = useTranslation();
  const { setLoading } = useLoader();
  const { user } = route.params;

  const [friendStatus, setFriendStatus] = useState(null);
  const [rating, setRating] = useState(5);

  const goToFriendsNotifications = () =>
    navigation.navigate('FriendsNotifications');

  const handleFetchData = async () => {
    try {
      setLoading(true);

      const { data: ratingData } = await getMyRating();
      const { data: friendStatusData } = await getFriendStatus(user.id);

      if (ratingData?.rating > 0) {
        setRating(ratingData.rating);
      }

      setFriendStatus(friendStatusData);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSendFriendRequest = async () => {
    try {
      setLoading(true);

      await sendFriendRequest(user.id);

      await handleFetchData();

      setLoading(false);

      notify({
        type: 'success',
        message: t('viewUser.sendFriendRequestSuccess'),
      });
    } catch (error) {
      setLoading(false);

      notify({ type: 'danger', message: t('viewUser.sendFriendRequestError') });
    }
  };

  const handleRemoveFriend = async () => {
    try {
      setLoading(true);
      await removeMyFriend(user.id);

      await handleFetchData();

      setLoading(false);

      notify({
        type: 'success',
        message: t('viewUser.removeFriendSuccess'),
      });
    } catch (error) {
      setLoading(false);

      notify({ type: 'danger', message: t('viewUser.removeFriendError') });
    }
  };

  const handleRemoveFriendRequest = async () => {
    try {
      setLoading(true);
      await cancelFriendRequest(friendStatus?.friend_request?.id);

      await handleFetchData();

      setLoading(false);

      notify({
        type: 'success',
        message: t('viewUser.cancelFriendRequestSuccess'),
      });
    } catch (error) {
      setLoading(false);

      notify({
        type: 'danger',
        message: t('viewUser.cancelFriendRequestError'),
      });
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (user) {
        handleFetchData();
      }
    });
    return unsubscribe;
  }, [navigation, user]);

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

        <View
          style={{
            flexDirection: 'row',
            marginTop: normalize(5),
          }}
        >
          <Text bold>{t('viewUser.ratingLabel')}: </Text>

          <Text>{rating} </Text>
          <Icon name="star" type="feather" color={COLORS.yellow} size={15} />
        </View>

        <Divider />

        {friendStatus?.received_friend_request && (
          <Button
            title={t('viewUser.answerFriendRequestButton')}
            onPress={goToFriendsNotifications}
          />
        )}

        {friendStatus?.sent_friend_request && (
          <Button
            title={t('viewUser.cancelFriendRequestButton')}
            style={{
              backgroundColor: COLORS.danger,
            }}
            onPress={handleRemoveFriendRequest}
          />
        )}

        {friendStatus?.friends && (
          <Button
            title={t('viewUser.removeFriendButton')}
            style={{
              backgroundColor: COLORS.danger,
            }}
            onPress={handleRemoveFriend}
          />
        )}

        {!friendStatus?.sent_friend_request &&
          !friendStatus?.received_friend_request &&
          friendStatus?.friends === false && (
            <Button
              title={t('viewUser.sendFriendRequestButton')}
              onPress={handleSendFriendRequest}
            />
          )}
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
