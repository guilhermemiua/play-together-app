import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../constants';
import Header from '../../components/Header';
import { getEvents } from '../../services';
import { useAuth } from '../../hooks';
import UserItem from '../../components/UserItem';

export default function Chats({ navigation }) {
  const { t } = useTranslation();
  const { loggedUser } = useAuth();

  const [events, setEvents] = useState([]);

  const navigateToEventHistory = () => {};
  const navigateToChatsSettings = () => navigation.navigate('ChatsSettings');

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
            name: 'Guilherme Eiti',
          },
          {
            id: 2,
            name: 'Basquete',
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
          // TODO: CRIAR CHAT ITEM
          <UserItem user={item} borderTop={index === 0} />
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
