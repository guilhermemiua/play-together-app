import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, FlatList } from 'react-native';
import { normalize } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
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

export default function Notifications({ navigation }) {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [friendRequestsReceived, setFriendRequestsReceived] = useState([]);

  const handleGetReceivedFriendRequests = async () => {
    const { data } = await getReceivedFriendRequests({ offset, limit });

    setFriendRequestsReceived(data.results);
  };

  const handleAcceptFriendRequest = async (friendRequestId) => {
    try {
      const { data } = await acceptFriendRequest(friendRequestId);

      setFriendRequestsReceived(data.results);

      await handleGetReceivedFriendRequests();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if ((offset || offset === 0) && limit) {
      handleGetReceivedFriendRequests();
    }
  }, [offset, limit]);

  return (
    <View style={styles.notifications}>
      {/* TODO: APPLY INFINITE */}
      <FlatList
        data={friendRequestsReceived}
        keyExtractor={(item) => item.id}
        // onEndReachedThreshold={0.1}
        // onEndReached={searchUsers}
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

                <Text>Sent you a friend request.</Text>
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
