import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { COLORS, METRICS, normalize } from '../../constants';
import Title from '../../components/Title';
import Button from '../../components/Button';
import Header from '../../components/Header';
import ProfileImage from '../../assets/images/Profile.jpg';

export default function Profile({ navigation: { navigate } }) {
  const { t } = useTranslation();
  const navigateToSettings = () => navigate('Settings');

  return (
    <View style={styles.profile}>
      <Header
        title={t('profile.title')}
        icons={[
          {
            name: 'settings',
            type: 'feather',
            onPress: navigateToSettings,
          },
        ]}
      />
      <View style={styles.profileContainer}>
        <View style={styles.profileInfoCard}>
          <Image source={ProfileImage} style={styles.profileImage} />

          <Title h3 style={{ color: COLORS.black }}>
            Guilherme Eiti
          </Title>

          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <InfoLabelComponent>{t('profile.age')}</InfoLabelComponent>
            <TextComponent>12</TextComponent>
          </View> */}
        </View>

        <Button title={t('profile.editProfileButton')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  profileContainer: {
    flex: 1,
    marginHorizontal: METRICS.containerMarginHorizontal,
    marginVertical: METRICS.containerMarginVertical,
  },
  profileImage: {
    width: normalize(120),
    height: normalize(120),
    borderRadius: normalize(120),
    alignSelf: 'center',
    marginBottom: normalize(METRICS.margin / 2),
  },
  profileInfoCard: {
    backgroundColor: COLORS.white,
    borderRadius: METRICS.borderRadius,
    padding: METRICS.padding,
    marginBottom: normalize(METRICS.margin / 2),
  },
});
