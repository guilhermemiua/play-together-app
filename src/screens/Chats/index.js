import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { COLORS } from '../../constants';
import Header from '../../components/Header';
import { getMyFriends, getMyGroups } from '../../services';
import ChatItem from '../../components/ChatItem';
import { useLoader } from '../../hooks';

export default function Chats({ navigation }) {
  const { setLoading } = useLoader();

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

  const handleGetChats = async () => {
    try {
      setLoading(true);

      const { data: groupsData } = await getMyGroups({});
      const { data: friendsData } = await getMyFriends({});

      setChats([
        ...groupsData.map((group) => ({
          ...group,
          type: 'group',
        })),
        ...friendsData.map((friend) => ({
          ...friend.friend,
          type: 'friend',
        })),
      ]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
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
          {
            name: 'plus-circle',
            type: 'feather',
            onPress: navigateToChatsSettings,
          },
        ]}
      />

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id.toString()}
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
