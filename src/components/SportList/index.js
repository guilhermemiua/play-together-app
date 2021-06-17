import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { Icon, normalize } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, METRICS, SPORTS } from '../../constants';
import {
  getSportIconName,
  getSportIconType,
  getSportName,
} from '../../helpers';
import Text from '../Text';

export default function SportList({ navigate }) {
  const navigateToCreateEvent = (sport) =>
    navigate('CreateEvent', {
      sport,
    });

  return (
    <FlatList
      style={styles.flatList}
      data={SPORTS}
      keyExtractor={(item) => item}
      // onRefresh={async () => {
      //   await dispatch(setRefresh(true));
      //   await dispatch(fetchBooks());
      //   await dispatch(setRefresh(false));
      // }}
      // refreshing={refreshing}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.sportCard}
          onPress={() => navigateToCreateEvent('tennis')}
        >
          <Text>{getSportName(item)}</Text>
          <Icon
            name={getSportIconName(item)}
            type={getSportIconType(item)}
            color={COLORS.primary}
            size={30}
          />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  flatList: {
    marginHorizontal: METRICS.containerMarginHorizontal,
  },
  sportCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: METRICS.borderRadius,
    backgroundColor: COLORS.white,
    padding: METRICS.padding,
    width: '100%',
    marginTop: normalize(10),
  },
});
