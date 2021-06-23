import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Avatar } from 'react-native-elements';
import { COLORS, METRICS, normalize } from '../../constants';
import Title from '../../components/Title';
import Text from '../../components/Text';
import Button from '../../components/Button';
import Header from '../../components/Header';
import DefaultProfileImage from '../../assets/images/DefaultProfile.png';
import Divider from '../../components/Divider';
import { useAuth } from '../../hooks';
import { getImage } from '../../helpers';

export default function Profile({ navigation: { navigate } }) {
  const { t } = useTranslation();
  const { loggedUser } = useAuth();

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
          <Avatar
            source={
              loggedUser?.profile_image
                ? {
                    uri: getImage(loggedUser.profile_image),
                  }
                : DefaultProfileImage
            }
            rounded
            size={150}
            containerStyle={styles.profileImage}
          />

          <Title h3 color={COLORS.black}>
            {loggedUser?.first_name} {loggedUser?.last_name},{' '}
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: METRICS.fontSize * 1.4,
              }}
            >
              {loggedUser?.age}
            </Text>
          </Title>

          <Text
            style={{
              alignSelf: 'center',
              marginTop: normalize(10),
            }}
          >
            {loggedUser?.city?.name}, {loggedUser?.state?.name}
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
