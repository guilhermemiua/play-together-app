import React from 'react';

import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, METRICS, normalize } from '../../constants';
import Text from '../Text';
import Title from '../Title';

export default function EventCard({ sport = '' }) {
  return (
    <View style={styles.eventCard}>
      <TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Title h3 style={{ color: COLORS.black, marginRight: normalize(5) }}>
            Soccer
          </Title>
          <Icon
            name="sports-soccer"
            type="material"
            color={COLORS.black}
            size={25}
          />
        </View>

        {/* <View style={styles.eventCardDivider} /> */}

        <View style={{ alignItems: 'flex-start' }}>
          <View style={{ alignItems: 'flex-start' }}>
            <Icon name="user" type="feather" color={COLORS.black} size={30} />
            <Text>Host: Guilherme Eiti</Text>
          </View>

          <View>
            <Text>1/8 players</Text>
          </View>
        </View>
        <View style={styles.eventCardDivider} />
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="map-pin"
              type="feather"
              color={COLORS.black}
              size={20}
            />
            <Text style={{ marginLeft: normalize(5) }}>
              Londrina Sport Club
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="calendar"
              type="feather"
              color={COLORS.black}
              size={20}
            />
            <Text style={{ marginLeft: normalize(5) }}>20/10/2021</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="clock" type="feather" color={COLORS.black} size={20} />
            <Text style={{ marginLeft: normalize(5) }}>10:00 - 11:00</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  eventCard: {
    flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    borderRadius: METRICS.borderRadius,
    backgroundColor: COLORS.white,
    padding: METRICS.padding,
    width: '100%',
  },
  eventCardDivider: {
    height: 0.5,
    backgroundColor: COLORS.borderColor,
    marginVertical: normalize(10),
  },
});
