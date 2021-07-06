import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { normalize } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, METRICS } from '../../../constants';
import Text from '../../../components/Text';
import Header from '../../../components/Header';
import EventCard from '../../../components/EventCard';
import { getMyEvents } from '../../../services';

export default function Calendar({ navigation }) {
  const { t } = useTranslation();

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [events, setEvents] = useState([]);

  // TODO: ADD PAGINATION
  const getAndSetEvents = async () => {
    const { data } = await getMyEvents({ offset, limit, type: 'upcoming' });

    setEvents(data.results);
  };

  useEffect(() => {
    if ((offset || offset === 0) && limit) {
      getAndSetEvents();
    }
  }, [offset, limit]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     getAndSetEvents();
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  return (
    <View style={styles.calendar}>
      {/* TODO: APPLY INFINITE */}
      <FlatList
        style={styles.eventList}
        data={events}
        keyExtractor={(item) => item.id}
        // onRefresh={async () => {
        //   await dispatch(setRefresh(true));
        //   await dispatch(fetchBooks());
        //   await dispatch(setRefresh(false));
        // }}
        // refreshing={refreshing}
        renderItem={({ item }) => (
          <EventCard event={item} navigation={navigation} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  eventList: {
    paddingHorizontal: METRICS.containerMarginHorizontal,
  },
});
