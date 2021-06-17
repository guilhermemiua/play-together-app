import React from 'react';

import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, METRICS, normalize } from '../../constants';
import {
  getSportIconName,
  getSportIconType,
  getSportName,
} from '../../helpers/sports';
import Text from '../Text';
import Title from '../Title';

export default function EventCard({ sport = '', navigation }) {
  const navigateToViewEvent = () => {
    navigation.navigate('ViewEvent', {
      sport: getSportName(sport),
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
            name={getSportIconName(sport)}
            type={getSportIconType(sport)}
            color={COLORS.primary}
            size={30}
          />

          <Title
            h4
            color={COLORS.primary}
            style={{ marginTop: normalize(5), flexShrink: 1 }}
          >
            {getSportName(sport)}
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
            <Text style={styles.infoItemText}>1/8</Text>
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
            <Text style={styles.infoItemText}>Londrina Sport Club</Text>
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
            <Text style={styles.infoItemText}>20/10/2021</Text>
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
            <Text style={styles.infoItemText}>10:00PM - 11:00PM</Text>
          </View>

          <View style={[styles.infoItem]}>
            <Icon name="user" type="feather" color={COLORS.black} size={20} />
            <Text style={styles.infoItemText}>Guilherme Eiti</Text>
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
