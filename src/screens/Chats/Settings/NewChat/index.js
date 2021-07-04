import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import UserItem from '../../../../components/UserItem';

import { COLORS } from '../../../../constants';
import { getMyFriends } from '../../../../services';

export default function NewChat({ navigation }) {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [users, setUsers] = useState([]);

  const handleGetMyFriends = async () => {
    const { data } = await getMyFriends({ offset, limit });

    setUsers(data.results);
  };

  const startNewChat = async (friend) => {
    await navigation.navigate('FriendChat', {
      friend,
      title: `${friend?.first_name} ${friend?.last_name}`,
    });
  };

  useEffect(() => {
    if ((offset || offset === 0) && limit) {
      handleGetMyFriends();
    }
  }, [offset, limit]);

  return (
    <View style={styles.newChat}>
      {/* TODO: APPLY INFINITE */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        // onEndReachedThreshold={0.1}
        // onEndReached={searchUsers}
        renderItem={({ item, index }) => (
          <UserItem
            user={item?.friend}
            borderTop={index === 0}
            onPress={() => startNewChat(item?.friend)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  newChat: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
});
