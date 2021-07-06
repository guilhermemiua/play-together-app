import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { normalize } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, METRICS } from '../../constants';
import Text from '../../components/Text';
import Header from '../../components/Header';
import EventCard from '../../components/EventCard';
import { getEvents } from '../../services';

export default function Events({ navigation }) {
  const { t } = useTranslation();

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [events, setEvents] = useState([]);

  const navigateToChooseSport = () => navigation.navigate('ChooseSport');

  // TODO: ADD PAGINATION
  const getAndSetEvents = async () => {
    const { data } = await getEvents({ offset, limit, type: 'upcoming' });

    setEvents(data?.results);
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
    <View style={styles.events}>
      <Header title={t('events.title')} />

      <View style={styles.subHeader}>
        <TouchableOpacity style={styles.subheaderButton}>
          <Text style={styles.locationText}>Londrina</Text>
          <Icon
            name="chevron-down"
            type="feather"
            color={COLORS.black}
            size={20}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.subheaderButton}
          onPress={navigateToChooseSport}
        >
          <Icon name="plus" type="feather" color={COLORS.black} size={20} />
          <Text style={styles.newEventText}>Create Event</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.subheaderButton}>
          <Icon
            name="align-justify"
            type="feather"
            color={COLORS.black}
            size={20}
          />
          <Text style={styles.filtersText}>Filters</Text>
        </TouchableOpacity>
      </View>

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
  events: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  subHeader: {
    paddingHorizontal: METRICS.containerMarginHorizontal,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: METRICS.padding,
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderBottomColor: COLORS.borderColor,
    // borderBottomWidth: normalize(1),
  },
  subheaderButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  locationText: {
    marginRight: normalize(5),
  },
  newEventText: {
    marginLeft: normalize(5),
  },
  filtersText: {
    marginLeft: normalize(5),
  },
  eventList: {
    paddingHorizontal: METRICS.containerMarginHorizontal,
  },
});
