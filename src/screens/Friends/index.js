import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../constants';
import Header from '../../components/Header';
import { getMyFriends, getTotalReceivedFriendRequests } from '../../services';
import UserItem from '../../components/UserItem';
import { useLoader } from '../../hooks';

export default function Friends({ navigation }) {
  const { t } = useTranslation();
  const firstUpdate = useRef(true);

  const { setLoading } = useLoader();

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [myFriends, setMyFriends] = useState([]);

  const navigateToNotifications = () =>
    navigation.navigate('FriendsNotifications');
  const navigateToAddFriend = () => navigation.navigate('AddFriend');
  const navigateToViewUser = (user) => {
    navigation.navigate('ViewUser', {
      title: `${user?.first_name} ${user?.last_name}`,
      user,
    });
  };

  // TODO: ADD PAGINATION
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await getMyFriends({ offset, limit });
      const { data: totalFriendRequestsReceived } =
        await getTotalReceivedFriendRequests();

      setLoading(false);
      setTotal(data?.total);
      setTotalNotifications(totalFriendRequestsReceived?.count);
      setMyFriends([...myFriends, ...data?.results]);
    } catch (error) {
      setLoading(false);
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
        fetchData();
      }
    }
  }, [offset, limit]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    }
  }, []);

  return (
    <View style={styles.friends}>
      <Header
        title={t('friends.title')}
        icons={[
          {
            name: 'bell',
            type: 'feather',
            onPress: navigateToNotifications,
            badge: true,
            badgeValue: totalNotifications,
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
        keyExtractor={(item) => item.id.toString()}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.8}
        renderItem={({ item, index }) => (
          <UserItem
            user={item?.friend}
            borderTop={index === 0}
            onPress={() => navigateToViewUser(item?.friend)}
          />
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
