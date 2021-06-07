import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import { Icon, normalize } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, METRICS } from '../../constants';
import Text from '../Text';

const sports = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

export default function SportList({ navigate }) {
  const navigateToCreateEvent = (sport) =>
    navigate('CreateEvent', {
      sport,
    });

  return (
    <FlatList
      style={styles.flatList}
      data={sports}
      keyExtractor={(item) => item.id}
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
          <Text>Tennis</Text>
          <Icon
            name="sports-soccer"
            type="material"
            color={COLORS.black}
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
