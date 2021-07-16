import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { COLORS, METRICS, normalize } from '../../../constants';
import Title from '../../../components/Title';
import Text from '../../../components/Text';
import UserItem from '../../../components/UserItem';
import Button from '../../../components/Button';
import { useAuth } from '../../../hooks/useAuth';
import {
  formatDateToLocale,
  formatTimeToLocale,
  getSportName,
  notify,
} from '../../../helpers';
import { getEvent, joinEvent, removeUserFromEvent } from '../../../services';

export default function ViewEvent({ navigation, route }) {
  const { t } = useTranslation();

  const { eventId, type } = route.params;

  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isParticipant, setIsParticipant] = useState(false);

  const { loggedUser } = useAuth();

  const navigateToSettings = () =>
    navigation.navigate('ViewEventSettings', {
      event,
    });

  const navigateToChat = () =>
    navigation.navigate('EventChat', {
      event,
    });

  const navigateToReviewPlayers = () => {
    navigation.navigate('ReviewPlayers', {
      event,
    });
  };

  const handleJoinButton = async () => {
    try {
      await joinEvent(eventId);

      setIsParticipant(true);

      setParticipants((currentParticipants) => [
        ...currentParticipants,
        loggedUser,
      ]);

      notify({
        type: 'success',
        message: t('viewEvent.joinEventSuccessMessage'),
      });
    } catch (error) {
      notify({ type: 'danger', message: t('viewEvent.joinEventErrorMessage') });
    }
  };

  const handleRemoveUserFromEvent = async (userId) => {
    try {
      await removeUserFromEvent(eventId, userId);

      await fetchAndSetEvent();

      notify({
        type: 'success',
        message: t('viewEvent.removeUserFromEventSuccessMessage'),
      });
    } catch (error) {
      notify({
        type: 'danger',
        message: t('viewEvent.removeUserFromEventErrorMessage'),
      });
    }
  };

  const fetchAndSetEvent = async () => {
    const { data: eventData } = await getEvent(eventId);

    setEvent(eventData);
    setParticipants([eventData.user, ...eventData.users]);

    if (loggedUser.id === eventData.user_id) {
      setIsParticipant(true);
    } else {
      setIsParticipant(
        eventData.users.some((participant) => participant.id === loggedUser.id)
      );
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchAndSetEvent();
    }
  }, [eventId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (eventId) {
        fetchAndSetEvent();
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <View style={styles.viewEvent}>
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
            {getSportName(event?.sport)}
          </Title>
          <Text color={COLORS.white} style={{ marginBottom: normalize(5) }}>
            {event?.date && formatDateToLocale(event.date)}{' '}
            {event?.start_time && formatTimeToLocale(event.start_time)} -{' '}
            {event?.end_time && formatTimeToLocale(event.end_time)}
          </Text>
          <Text color={COLORS.white}>
            {event?.local} - {event?.city?.name}/{event?.state?.name}
          </Text>
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
            {t('viewEvent.participantsText')} ({participants.length}/
            {event?.players_quantity && event?.players_quantity + 1})
          </Title>
        </View>

        <View style={{ backgroundColor: COLORS.white }}>
          {participants.map((participant) => (
            <UserItem
              user={participant}
              key={participant.id}
              owner={participant.id === event?.user_id}
              canDelete={type !== 'past' && event?.user_id === loggedUser?.id}
              handleDelete={() => handleRemoveUserFromEvent(participant?.id)}
            />
          ))}
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        {isParticipant && (
          <>
            <Button
              title="Chat"
              containerStyle={{ flex: 1 }}
              style={{ marginRight: normalize(5) }}
              onPress={navigateToChat}
            />
            {type === 'past' ? (
              <Button
                title={t('viewEvent.reviewUsersText')}
                containerStyle={{ flex: 1 }}
                style={{ marginLeft: normalize(5) }}
                type="outline"
                onPress={navigateToReviewPlayers}
              />
            ) : (
              <Button
                title={t('viewEvent.settingsText')}
                containerStyle={{ flex: 1 }}
                style={{ marginLeft: normalize(5) }}
                type="outline"
                onPress={navigateToSettings}
              />
            )}
          </>
        )}

        {!isParticipant && (
          <Button
            title={t('viewEvent.joinText')}
            containerStyle={{ flex: 1 }}
            type="solid"
            onPress={handleJoinButton}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  viewEvent: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
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
