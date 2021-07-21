import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { COLORS, METRICS, normalize } from '../../../constants';
import DefaultProfileImage from '../../../assets/images/DefaultProfile.png';
import { getImage, notify } from '../../../helpers';
import Title from '../../../components/Title';
import Button from '../../../components/Button';
import UserItem from '../../../components/UserItem';
import { useAuth } from '../../../hooks/useAuth';
import { removeUserFromGroup } from '../../../services';
import { useLoader } from '../../../hooks';

export default function ViewGroup({ route, navigation }) {
  const { group } = route.params;

  const { t } = useTranslation();
  const { loggedUser } = useAuth();
  const { setLoading } = useLoader();

  const [participants, setParticipants] = useState([]);

  const handleDeleteUser = async (userId) => {
    try {
      setLoading(true);

      await removeUserFromGroup(group.id, userId);

      setParticipants(
        participants.filter((participant) => participant.id !== userId)
      );

      setLoading(false);

      notify({
        type: 'success',
        message: t('viewGroup.settings.removeUserFromGroupSuccessMessage'),
      });
    } catch (error) {
      setLoading(false);
      notify({
        type: 'danger',
        message: t('viewGroup.settings.removeUserFromGroupErrorMessage'),
      });
    }
  };

  const navigateToSettings = () =>
    navigation.navigate('GroupSettings', {
      group,
    });

  useEffect(() => {
    if (group && loggedUser) {
      setParticipants([loggedUser, ...group.users]);
    }
  }, [group, loggedUser]);

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
          {participants.map((participant) => (
            <UserItem
              user={participant}
              key={participant.id}
              owner={participant.id === group.user_id}
              canDelete={participant.id !== group.user_id}
              handleDelete={() => handleDeleteUser(participant.id)}
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
