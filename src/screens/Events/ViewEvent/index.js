import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, METRICS, normalize } from '../../../constants';
import Title from '../../../components/Title';
import Text from '../../../components/Text';
import UserItem from '../../../components/UserItem';
import Button from '../../../components/Button';

const users = [
  {
    id: 1,
    name: 'Guilherme Eiti',
  },
  {
    id: 2,
    name: 'Bruno Ricardo',
  },
];

export default function ViewEvent({ navigation: { navigate } }) {
  const { t } = useTranslation();

  return (
    <>
      <ScrollView style={styles.viewEvent}>
        <View
          style={{
            backgroundColor: COLORS.black,
            paddingHorizontal: METRICS.containerMarginHorizontal,
            paddingBottom: METRICS.padding,
            marginBottom: METRICS.margin,
          }}
        >
          <Title
            h2
            color={COLORS.white}
            textAlign="left"
            style={{ marginBottom: normalize(10) }}
          >
            Soccer
          </Title>
          <Text color={COLORS.white} style={{ marginBottom: normalize(5) }}>
            11/05/2021 10:OOAM - 11:00AM
          </Text>
          <Text color={COLORS.white}>Kosmos Clube - Mogi das Cruzes/SP</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: METRICS.containerMarginHorizontal,
            marginBottom: normalize(METRICS.margin / 2),
          }}
        >
          <Title h4 color={COLORS.black}>
            Players (2/8)
          </Title>
          <TouchableOpacity>
            <Title h4 color={COLORS.black}>
              Manage
            </Title>
          </TouchableOpacity>
        </View>

        <View style={{ backgroundColor: COLORS.white }}>
          {users.map((user) => (
            <UserItem user={user} key={user.id} />
          ))}
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: COLORS.white,
          paddingHorizontal: METRICS.containerMarginHorizontal,
          paddingVertical: METRICS.containerMarginVertical,
          alignContent: 'center',
        }}
      >
        <Button title="Game Chat" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  viewEvent: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
});
