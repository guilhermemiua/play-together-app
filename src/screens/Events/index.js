import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { normalize } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, METRICS } from '../../constants';
import Text from '../../components/Text';
import Header from '../../components/Header';
import EventCard from '../../components/EventCard';
import { useEventFilter } from '../../hooks';

export default function Events({ navigation }) {
  const { t } = useTranslation();
  const { city, setOffset, offset, limit, total, events } = useEventFilter();

  const goToSelectCity = () => navigation.navigate('EventSelectCity');
  const navigateToChooseSport = () => navigation.navigate('ChooseSport');

  const fetchMore = () => {
    if (offset * limit <= total) {
      setOffset((oldOffset) => oldOffset + 1);
    }
  };

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
