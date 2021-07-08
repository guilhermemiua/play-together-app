import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { COLORS, METRICS, normalize } from '../../../constants';
import DefaultProfileImage from '../../../assets/images/DefaultProfile.png';
import { getImage } from '../../../helpers';
import Title from '../../../components/Title';
import Button from '../../../components/Button';
import EventUserItem from '../../../components/EventUserItem';

export default function ViewGroup({ route, navigation }) {
  const { t } = useTranslation();
  const { group } = route.params;

  const navigateToSettings = () =>
    navigation.navigate('GroupSettings', {
      group,
    });

  return (
    <>
      <View style={styles.viewGroup}>
        <Image
          source={
            group?.group_image
              ? {
                  uri: getImage(group.group_image),
                }
              : DefaultProfileImage
          }
          style={{
            width: '100%',
            height: normalize(250),
            backgroundColor: COLORS.white,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: METRICS.containerMarginHorizontal,
            marginBottom: normalize(METRICS.margin / 2),
            marginTop: METRICS.margin,
          }}
        >
          <Title h4 color={COLORS.black}>
            {t('viewEvent.participantsText')}
          </Title>
        </View>

        <View style={{ backgroundColor: COLORS.white }}>
          {[].map((participant) => (
            <EventUserItem
              user={participant}
              key={participant.id}
              owner={participant.id === group.user_id}
            />
          ))}
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title={t('viewEvent.settingsText')}
          containerStyle={{ flex: 1 }}
          style={{ marginLeft: normalize(5) }}
          // type="outline"
          onPress={navigateToSettings}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  viewGroup: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  container: {
    paddingVertical: METRICS.containerMarginVertical,
    paddingHorizontal: METRICS.containerMarginHorizontal,
    backgroundColor: COLORS.white,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    paddingHorizontal: METRICS.containerMarginHorizontal,
    paddingVertical: METRICS.containerMarginVertical,
    alignItems: 'center',
  },
});
