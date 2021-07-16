import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import UserItem from '../../../../../components/UserItem';

import { COLORS, METRICS } from '../../../../../constants';
import { notify } from '../../../../../helpers';
import { addUserToGroup, getMyFriends } from '../../../../../services';

export default function AddUser({ navigation, route }) {
  const { t } = useTranslation();
  const { group } = route.params;

  const firstUpdate = useRef(true);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [friends, setFriends] = useState([]);

  const handleAddUserToGroup = async (user) => {
    try {
      await addUserToGroup(group.id, user.id);

      await navigation.navigate('ViewGroup', {
        group: {
          ...group,
          users: [...group.users, user],
        },
        title: group.name,
      });

      notify({ message: t('addUserToGroup.successMessage'), type: 'success' });
    } catch (error) {
      notify({ message: t('addUserToGroup.errorMessage'), type: 'danger' });
    }
  };

  const handleGetMyFriends = async () => {
    const { data } = await getMyFriends({ offset, limit });

    setTotal(data?.total);
    setFriends([...friends, ...data?.results]);
  };

  const fetchMore = () => {
    if (offset * limit <= total) {
      setOffset((oldOffset) => oldOffset + 1);
    }
  };

  useEffect(() => {
    if ((offset || offset === 0) && limit) {
      if (!firstUpdate.current) {
        handleGetMyFriends();
      }
    }
  }, [offset, limit]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetMyFriends();
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
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.8}
        renderItem={({ item, index }) => (
          <UserItem
            user={item?.friend}
            borderTop={index === 0}
            // RightIcon={() => (
            //   <Icon
            //     name="check"
            //     type="feather"
            //     color={COLORS.primary}
            //     size={30}
            //   />
            // )}
            onPress={() => handleAddUserToGroup(item.friend)}
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
