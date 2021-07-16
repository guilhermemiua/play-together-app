import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, FlatList } from 'react-native';
import Input from '../../../components/Input';
import Label from '../../../components/Label';
import UserItem from '../../../components/UserItem';

import { COLORS, METRICS } from '../../../constants';
import { getUsers } from '../../../services';

export default function AddFriend({ navigation }) {
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [users, setUsers] = useState([]);

  const searchUsers = async () => {
    const { data } = await getUsers({ name, offset, limit, notFriends: '1' });

    setUsers(data.results);
  };

  const navigateToViewUser = (user) => {
    navigation.navigate('ViewUser', {
      title: `${user?.first_name} ${user?.last_name}`,
      user,
    });
  };

  useEffect(() => {
    if (name || ((offset || offset === 0) && limit)) {
      searchUsers();
    }
  }, [name, offset, limit]);

  return (
    <View style={styles.addFriend}>
      <View style={styles.inputContainer}>
        <Label>{t('addFriend.nameLabel')}</Label>
        <Input
          placeholder={t('addFriend.nameInputPlaceholder')}
          onChangeText={(value) => {
            setName(value);
          }}
        />
      </View>

      {/* TODO: APPLY INFINITE */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        // onEndReachedThreshold={0.1}
        // onEndReached={searchUsers}
        renderItem={({ item, index }) => (
          <UserItem
            user={item}
            borderTop={index === 0}
            onPress={() => navigateToViewUser(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addFriend: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  inputContainer: {
    marginTop: METRICS.containerMarginVertical,
    marginBottom: METRICS.margin,
    marginHorizontal: METRICS.containerMarginHorizontal,
  },
});
