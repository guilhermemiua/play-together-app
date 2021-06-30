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
import Title from '../../components/Title';
import { useAuth } from '../../hooks';

export default function Home({ navigation }) {
  const { t } = useTranslation();
  const { loggedUser } = useAuth();

  const [events, setEvents] = useState([]);

  const navigateToCalendar = () => navigation.navigate('Calendar');
  const navigateToEventHistory = () => navigation.navigate('EventHistory');

  // TODO: ADD PAGINATION
  const getAndSetEvents = async () => {
    const { data } = await getEvents({});

    setEvents(data);
  };

  useEffect(() => {
    getAndSetEvents();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAndSetEvents();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.home}>
      <View style={styles.homeContainer}>
        <Text
          color={COLORS.primary}
          textAlign="left"
          style={{
            fontSize: METRICS.fontSize * 2.6,
            fontFamily: METRICS.fontFamilyBold,
          }}
        >
          Welcome,
        </Text>
        <Title
          h1
          color={COLORS.primary}
          textAlign="left"
          style={{ marginBottom: normalize(METRICS.margin / 2) }}
        >
          {loggedUser.first_name}! 👋
        </Title>

        <TouchableOpacity style={styles.card} onPress={navigateToCalendar}>
          <Title h3 color={COLORS.black} textAlign="left">
            Upcoming events
          </Title>

          <Icon
            name="calendar"
            type="feather"
            color={COLORS.primary}
            size={30}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={navigateToEventHistory}>
          <Title h3 color={COLORS.black} textAlign="left">
            Event history
          </Title>

          <Icon name="map" type="feather" color={COLORS.primary} size={30} />
        </TouchableOpacity>
        {/* TODO: APPLY INFINITE */}
        {/* <FlatList
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
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  homeContainer: {
    flex: 1,
    paddingHorizontal: METRICS.containerMarginHorizontal,
    paddingVertical: METRICS.containerMarginVertical,
  },
  card: {
    backgroundColor: COLORS.white,
    paddingVertical: normalize(METRICS.padding * 2),
    paddingHorizontal: METRICS.padding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: COLORS.borderColor,
    borderRadius: METRICS.borderRadius,
    borderWidth: normalize(1),
    marginTop: normalize(METRICS.margin / 2),
  },
});
