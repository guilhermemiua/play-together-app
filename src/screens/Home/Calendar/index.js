import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { COLORS, METRICS } from '../../../constants';
import EventCard from '../../../components/EventCard';
import { getMyEvents } from '../../../services';

export default function Calendar({ navigation }) {
  const firstUpdate = useRef(true);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [events, setEvents] = useState([]);

  // TODO: ADD PAGINATION
  const getAndSetEvents = async () => {
    const { data } = await getMyEvents({ offset, limit, type: 'upcoming' });

    setTotal(data?.total);
    setEvents([...events, ...data.results]);
  };

  const fetchMore = () => {
    if (offset * limit <= total) {
      setOffset((oldOffset) => oldOffset + 1);
    }
  };

  useEffect(() => {
    if ((offset || offset === 0) && limit) {
      if (!firstUpdate.current) {
        getAndSetEvents();
      }
    }
  }, [offset, limit]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAndSetEvents();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    }
  }, []);

  return (
    <View style={styles.calendar}>
      {/* TODO: APPLY INFINITE */}
      <FlatList
        style={styles.eventList}
        data={events}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.8}
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
