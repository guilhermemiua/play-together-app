import React, { useEffect, useRef, useState } from 'react';
import { Image, View, StyleSheet, FlatList } from 'react-native';
import { normalize } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import Title from '../../../components/Title';
import Text from '../../../components/Text';
import Divider from '../../../components/Divider';
import DefaultProfileImage from '../../../assets/images/DefaultProfile.png';

import { COLORS, METRICS } from '../../../constants';
import { getImage } from '../../../helpers';
import {
  acceptFriendRequest,
  getReceivedFriendRequests,
} from '../../../services';
import Button from '../../../components/Button';
import { useLoader } from '../../../hooks';

export default function Notifications({ navigation }) {
  const { t } = useTranslation();
  const { setLoading } = useLoader();

  const firstUpdate = useRef(true);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [friendRequestsReceived, setFriendRequestsReceived] = useState([]);

  const handleGetReceivedFriendRequests = async () => {
    const { data } = await getReceivedFriendRequests({ offset, limit });

    setFriendRequestsReceived(data.results);
  };

  const handleAcceptFriendRequest = async (friendRequestId) => {
    try {
      setLoading(true);

      const { data } = await acceptFriendRequest(friendRequestId);

      setFriendRequestsReceived(data.results);
      setLoading(false);

      await handleGetReceivedFriendRequests();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fetchMore = () => {
    if (offset * limit <= total) {
      setOffset((oldOffset) => oldOffset + 1);
    }
  };

  useEffect(() => {
    if ((offset || offset === 0) && limit) {
      if (!firstUpdate.current) {
        handleGetReceivedFriendRequests();
      }
    }
  }, [offset, limit]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetReceivedFriendRequests();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    }
  }, []);

  return (
    <View style={styles.notifications}>
      {/* TODO: APPLY INFINITE */}
      <FlatList
        data={friendRequestsReceived}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.8}
        renderItem={({ item }) => (
          <View style={[styles.notification]}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image
                source={
                  item?.sender?.profile_image
                    ? {
                        uri: getImage(item?.sender?.profile_image),
                      }
                    : DefaultProfileImage
                }
                style={styles.notificationImage}
              />
              <View>
                <Title h4 color={COLORS.black} textAlign="left">
                  {item?.sender?.first_name} {item?.sender?.last_name}
                </Title>

                <Text>{t('friendsNotifications.sentFriendRequest')}</Text>
              </View>
            </TouchableOpacity>

            <Divider />

            <View style={{ flexDirection: 'row' }}>
              <Button
                title="Accept"
                containerStyle={{ flex: 1, marginRight: normalize(5) }}
                onPress={() => handleAcceptFriendRequest(item.id)}
              />
              <Button
                title="Decline"
                containerStyle={{ flex: 1, marginLeft: normalize(5) }}
                type="outline"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  notifications: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  notification: {
    backgroundColor: COLORS.white,
    paddingVertical: METRICS.padding,
    paddingHorizontal: METRICS.padding,
    flexDirection: 'column',
    justifyContent: 'center',
    borderColor: COLORS.borderColor,
    borderRadius: METRICS.borderRadius,
    borderBottomWidth: normalize(1),
  },
  notificationImage: {
    width: normalize(45),
    height: normalize(45),
    borderRadius: normalize(45),
    borderColor: COLORS.borderColor,
    borderWidth: normalize(1),
    marginRight: normalize(10),
  },
});
