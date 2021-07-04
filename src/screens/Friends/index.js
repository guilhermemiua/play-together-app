import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { COLORS } from '../../constants';
import Header from '../../components/Header';
import { getMyFriends } from '../../services';
import UserItem from '../../components/UserItem';

export default function Friends({ navigation }) {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [myFriends, setMyFriends] = useState([]);

  const navigateToNotifications = () =>
    navigation.navigate('FriendsNotifications');
  const navigateToAddFriend = () => navigation.navigate('AddFriend');

  // TODO: ADD PAGINATION
  const handleGetMyFriends = async () => {
    const { data } = await getMyFriends({ offset, limit });

    setMyFriends(data?.results);
  };

  useEffect(() => {
    handleGetMyFriends();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetMyFriends();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.friends}>
      <Header
        title="Friends"
        icons={[
          {
            name: 'bell',
            type: 'feather',
            onPress: navigateToNotifications,
          },
          {
            name: 'user-plus',
            type: 'feather',
            onPress: navigateToAddFriend,
          },
        ]}
      />

      {/* TODO: APPLY INFINITE */}
      <FlatList
        data={myFriends}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <UserItem user={item?.friend} borderTop={index === 0} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  friends: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
});
