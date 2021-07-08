import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { COLORS } from '../../../../constants';
import Header from '../../../../components/Header';
import { getMyFriends } from '../../../../services';
import UserItem from '../../../../components/UserItem';

export default function ReviewPlayers({ route, navigation }) {
  const { event } = route.params;

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const navigateToNotifications = () =>
    navigation.navigate('FriendsNotifications');
  const navigateToAddFriend = () => navigation.navigate('AddFriend');

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
        renderItem={({ item, index }) => (
          <UserItem user={item} borderTop={index === 0} />
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
});
