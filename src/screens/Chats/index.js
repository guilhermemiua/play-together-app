import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../constants';
import Header from '../../components/Header';
import { getMyFriends, getMyGroups } from '../../services';
import { useAuth } from '../../hooks';
import ChatItem from '../../components/ChatItem';

export default function Chats({ navigation }) {
  const { t } = useTranslation();
  const { loggedUser } = useAuth();

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [friendsOffset, setFriendsOffset] = useState(0);
  const [friendsLimit, setFriendsLimit] = useState(10);
  const [chats, setChats] = useState([]);

  const navigateToChatsSettings = () => navigation.navigate('ChatsSettings');
  const navigateToFriendChat = (friend) =>
    navigation.navigate('FriendChat', {
      title: `${friend?.first_name} ${friend?.last_name}`,
      friend,
    });
  const navigateToGroupChat = (group) =>
    navigation.navigate('GroupChat', {
      title: group.name,
      group,
    });

  // TODO: ADD PAGINATION
  const handleGetChats = async () => {
    const { data: groupsData } = await getMyGroups({ offset, limit });
    const { data: friendsData } = await getMyFriends({
      offset: friendsOffset,
      limit: friendsLimit,
    });

    setChats([
      ...groupsData.results.map((group) => ({
        ...group,
        type: 'group',
      })),
      ...friendsData.results.map((friend) => ({
        ...friend.friend,
        type: 'friend',
      })),
    ]);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetChats();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.chats}>
      <Header
        title="Chats"
        icons={[
          // {
          //   name: 'bell',
          //   type: 'feather',
          //   onPress: () => {},
          // },
          {
            name: 'plus-circle',
            type: 'feather',
            onPress: navigateToChatsSettings,
          },
        ]}
      />

      {/* TODO: APPLY INFINITE */}
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        // onRefresh={async () => {
        //   await dispatch(setRefresh(true));
        //   await dispatch(fetchBooks());
        //   await dispatch(setRefresh(false));
        // }}
        // refreshing={refreshing}
        renderItem={({ item, index }) => (
          <ChatItem
            type={item.type}
            item={item}
            borderTop={index === 0}
            onPress={
              item.type === 'group'
                ? () => navigateToGroupChat(item)
                : () => navigateToFriendChat(item)
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chats: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
});
