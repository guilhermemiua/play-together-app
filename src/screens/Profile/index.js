import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { COLORS, METRICS, normalize } from '../../constants';
import Title from '../../components/Title';
import Text from '../../components/Text';
import Button from '../../components/Button';
import Header from '../../components/Header';
import ProfileImage from '../../assets/images/Profile.jpg';
import Divider from '../../components/Divider';

export default function Profile({ navigation: { navigate } }) {
  const { t } = useTranslation();

  const navigateToSettings = () => navigate('Settings');

  const navigateToEditProfile = () => navigate('EditProfile');

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

          <Title h3 color={COLORS.black}>
            Guilherme Eiti,{' '}
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: METRICS.fontSize * 1.4,
              }}
            >
              20
            </Text>
          </Title>

          <Text
            style={{
              alignSelf: 'center',
              marginTop: normalize(10),
            }}
          >
            Mogi das Cruzes, SP
          </Text>

          <Divider type="horizontal" />

          <Button
            title={t('profile.editProfileButton')}
            onPress={navigateToEditProfile}
          />
        </View>
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
