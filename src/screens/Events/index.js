import React, { useEffect, useState, useRef } from 'react';
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
import { useEventFilter } from '../../hooks';

export default function Events({ navigation, route }) {
  const { t } = useTranslation();
  const { cityId, city } = useEventFilter();

  const firstUpdate = useRef(true);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [events, setEvents] = useState([]);

  const goToSelectCity = () => navigation.navigate('EventSelectCity');
  const navigateToChooseSport = () => navigation.navigate('ChooseSport');

  // TODO: ADD PAGINATION
  const handleGetEvents = async () => {
    const { data } = await getEvents({
      offset,
      limit,
      type: 'upcoming',
      cityId,
    });

    setTotal(data.total);
    setEvents([...events, ...data.results]);
  };

  const fetchMore = () => {
    if (offset * limit <= total) {
      setOffset((oldOffset) => oldOffset + 1);
    }
  };

  useEffect(() => {
    if ((offset || offset === 0) && limit) {
      // if (!firstUpdate.current) {
      handleGetEvents();
      // }
    }
  }, [offset, limit, cityId]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     handleGetEvents();
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  // useEffect(() => {
  //   if (firstUpdate.current) {
  //     firstUpdate.current = false;
  //   }
  // }, []);

  return (
    <View style={styles.events}>
      <Header title={t('events.title')} />

      <View style={styles.subHeader}>
        <TouchableOpacity
          style={styles.subheaderButton}
          onPress={goToSelectCity}
        >
          <Text style={styles.locationText}>{city}</Text>
          <Icon
            name="chevron-down"
            type="feather"
            color={COLORS.black}
            size={20}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.subheaderButton,
            // {
            //   // marginLeft: normalize(10),
            // },
          ]}
          onPress={navigateToChooseSport}
        >
          <Icon name="plus" type="feather" color={COLORS.black} size={20} />
          <Text style={styles.newEventText}>{t('events.createEvent')}</Text>
        </TouchableOpacity>

        <View
          style={{
            width: normalize(80),
          }}
        />
        {/* 
        <TouchableOpacity style={styles.subheaderButton}>
          <Icon
            name="align-justify"
            type="feather"
            color={COLORS.black}
            size={20}
          />
          <Text style={styles.filtersText}>{t('events.filters')}</Text>
        </TouchableOpacity> */}
      </View>

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
