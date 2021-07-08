import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../constants';
import Header from '../../components/Header';
import { getEvents } from '../../services';
import { useAuth } from '../../hooks';
import ChatItem from '../../components/ChatItem';

export default function Chats({ navigation }) {
  const { t } = useTranslation();
  const { loggedUser } = useAuth();

  const [events, setEvents] = useState([]);

  const navigateToChatsSettings = () => navigation.navigate('ChatsSettings');
  const navigateToFriendChat = (friend) =>
    navigation.navigate('FriendChat', {
      title: `${friend?.first_name} ${friend?.last_name}`,
      user: friend,
    });
  const navigateToGroupChat = (group) =>
    navigation.navigate('GroupChat', {
      title: group.name,
      group,
    });

  // TODO: ADD PAGINATION
  const getAndSetEvents = async () => {
    const { data } = await getEvents({});

    setEvents(data);
  };

  useEffect(() => {
    getAndSetEvents();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAndSetEvents();
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
        data={[
          {
            id: 1,
            first_name: 'Guilherme',
            last_name: 'Eiti',
            type: 'friend',
          },
          {
            id: 2,
            name: 'Basquete',
            type: 'group',
          },
        ]}
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
