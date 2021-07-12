import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { COLORS, normalize, METRICS } from '../../../../constants';
import Divider from '../../../../components/Divider';
import Title from '../../../../components/Title';
import DefaultProfileImage from '../../../../assets/images/DefaultProfile.png';

import { getImage } from '../../../../helpers';
import Text from '../../../../components/Text';

export default function ReviewPlayers({ route, navigation }) {
  const { event } = route.params;

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  // // TODO: ADD PAGINATION
  // const handleGetMyFriends = async () => {
  //   const { data } = await getMyFriends({ offset, limit });

  //   setMyFriends(data?.results);
  // };

  // useEffect(() => {
  //   handleGetMyFriends();
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     handleGetMyFriends();
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  return (
    <View style={styles.players}>
      {/* TODO: APPLY INFINITE */}
      <FlatList
        data={event?.users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.player]}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image
                source={
                  item?.profile_image
                    ? {
                        uri: getImage(item?.profile_image),
                      }
                    : DefaultProfileImage
                }
                style={styles.playerImage}
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
              {/* <Button
                title="Accept"
                containerStyle={{ flex: 1, marginRight: normalize(5) }}
                onPress={() => handleAcceptFriendRequest(item.id)}
              />
              <Button
                title="Decline"
                containerStyle={{ flex: 1, marginLeft: normalize(5) }}
                type="outline"
              /> */}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  players: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  player: {
    backgroundColor: COLORS.white,
    paddingVertical: METRICS.padding,
    paddingHorizontal: METRICS.padding,
    flexDirection: 'column',
    justifyContent: 'center',
    borderColor: COLORS.borderColor,
    borderRadius: METRICS.borderRadius,
    borderBottomWidth: normalize(1),
  },
  playerImage: {
    width: normalize(45),
    height: normalize(45),
    borderRadius: normalize(45),
    borderColor: COLORS.borderColor,
    borderWidth: normalize(1),
    marginRight: normalize(10),
  },
});
