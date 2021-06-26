import React from 'react';

import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, METRICS, normalize } from '../../constants';
import { formatDateToLocale, formatTimeToLocale } from '../../helpers';
import {
  getSportIconName,
  getSportIconType,
  getSportName,
} from '../../helpers/sports';
import Text from '../Text';
import Title from '../Title';

export default function EventCard({ event = {}, navigation }) {
  const navigateToViewEvent = () => {
    navigation.navigate('ViewEvent', {
      eventId: event?.id,
    });
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.cardButton} onPress={navigateToViewEvent}>
        <View
          style={{
            alignItems: 'center',
            width: normalize(90),
          }}
        >
          <Icon
            name={getSportIconName(event?.sport)}
            type={getSportIconType(event?.sport)}
            color={COLORS.primary}
            size={30}
          />

          <Title
            h4
            color={COLORS.primary}
            style={{ marginTop: normalize(5), flexShrink: 1 }}
          >
            {getSportName(event?.sport)}
          </Title>

          <View
            style={[
              styles.infoItem,
              {
                marginTop: normalize(5),
              },
            ]}
          >
            <Icon name="users" type="feather" color={COLORS.black} size={20} />
            <Text style={styles.infoItemText}>
              {event?.users?.length + 1 || 1}/{event?.players_quantity}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.info}>
          <View
            style={[
              styles.infoItem,
              {
                marginBottom: normalize(5),
              },
            ]}
          >
            <Icon
              name="map-pin"
              type="feather"
              color={COLORS.black}
              size={20}
            />
            <Text style={styles.infoItemText}>{event?.local}</Text>
          </View>

          <View
            style={[
              styles.infoItem,
              {
                marginBottom: normalize(5),
              },
            ]}
          >
            <Icon
              name="calendar"
              type="feather"
              color={COLORS.black}
              size={20}
            />
            <Text style={styles.infoItemText}>
              {event?.date && formatDateToLocale(event.date)}
            </Text>
          </View>

          <View
            style={[
              styles.infoItem,
              {
                marginBottom: normalize(5),
              },
            ]}
          >
            <Icon name="clock" type="feather" color={COLORS.black} size={20} />
            <Text style={styles.infoItemText}>
              {event?.start_time && formatTimeToLocale(event.start_time)} -
              {event?.end_time && formatTimeToLocale(event.end_time)}
            </Text>
          </View>

          <View style={[styles.infoItem]}>
            <Icon name="user" type="feather" color={COLORS.black} size={20} />
            <Text style={styles.infoItemText}>
              {event?.user?.first_name} {event?.user?.last_name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    borderRadius: METRICS.borderRadius,
    backgroundColor: COLORS.white,
    paddingHorizontal: METRICS.padding,
    paddingVertical: normalize(METRICS.padding + 5),
    width: '100%',
    marginTop: normalize(METRICS.margin / 2),
  },
  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  divider: {
    width: 0.5,
    height: '100%',
    backgroundColor: COLORS.borderColor,
  },
  info: {
    minWidth: normalize(180),
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoItemText: {
    marginLeft: normalize(5),
  },
});
