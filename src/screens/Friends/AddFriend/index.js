import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, FlatList } from 'react-native';
import Input from '../../../components/Input';
import Label from '../../../components/Label';
import UserItem from '../../../components/UserItem';

import { COLORS, METRICS } from '../../../constants';
import { useLoader } from '../../../hooks';
import { getUsers } from '../../../services';

export default function AddFriend({ navigation }) {
  const { t } = useTranslation();
  const { setLoading } = useLoader();

  const firstUpdate = useRef(true);

  const [name, setName] = useState('');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState([]);

  const searchUsers = async () => {
    try {
      setLoading(true);

      const { data } = await getUsers({ name, offset, limit, notFriends: '1' });

      setLoading(false);
      setTotal(data?.total);
      setUsers([...users, ...data.results]);
    } catch (error) {
      setLoading(false);
    }
  };

  const navigateToViewUser = (user) => {
    navigation.navigate('ViewUser', {
      title: `${user?.first_name} ${user?.last_name}`,
      user,
    });
  };

  const fetchMore = () => {
    if (offset * limit <= total) {
      setOffset((oldOffset) => oldOffset + 1);
    }
  };

  useEffect(() => {
    if (name || ((offset || offset === 0) && limit)) {
      if (!firstUpdate.current) {
        searchUsers();
      }
    }
  }, [name, offset, limit]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      searchUsers();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    }
  }, []);

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
        onEndReached={fetchMore}
        onEndReachedThreshold={0.8}
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
