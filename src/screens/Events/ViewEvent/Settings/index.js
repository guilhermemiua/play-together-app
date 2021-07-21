import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import { COLORS, METRICS } from '../../../../constants';
import { notify } from '../../../../helpers';
import { useAuth } from '../../../../hooks/useAuth';
import { deleteEvent, disjoinEvent } from '../../../../services';
import Text from '../../../../components/Text';
import { useEventFilter, useLoader } from '../../../../hooks';

export default function Settings({ route, navigation }) {
  const { t } = useTranslation();
  const { loggedUser } = useAuth();
  const { setRefetch } = useEventFilter();
  const { setLoading } = useLoader();

  const { event } = route.params;

  const navigateToEditEvent = () =>
    navigation.navigate('EditEvent', {
      event,
    });

  const handleDisjoin = async () => {
    try {
      setLoading(true);

      await disjoinEvent(event?.id);

      await navigation.goBack();

      notify({
        type: 'success',
        message: t('viewEvent.settings.leftSuccessMessage'),
      });

      setRefetch(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notify({
        type: 'danger',
        message: t('viewEvent.settings.leftErrorMessage'),
      });
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteEvent(event?.id);

      await navigation.navigate('Events');

      notify({
        type: 'success',
        message: t('viewEvent.settings.deleteSuccessMessage'),
      });

      setRefetch(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notify({
        type: 'danger',
        message: t('viewEvent.settings.deleteErrorMessage'),
      });
    }
  };

  return (
    <View style={styles.settings}>
      {event?.user_id === loggedUser.id && (
        <>
          <TouchableOpacity
            style={styles.settingsItem}
            onPress={navigateToEditEvent}
          >
            <Text style={styles.settingsItemText}>
              {t('viewEvent.settings.editEvent')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsItem} onPress={handleDelete}>
            <Text style={styles.settingsItemText}>
              {t('viewEvent.settings.deleteEvent')}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {event?.user_id !== loggedUser.id && (
        <TouchableOpacity style={styles.settingsItem} onPress={handleDisjoin}>
          <Text style={styles.settingsItemText}>
            {t('viewEvent.settings.leftEvent')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  settings: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  settingsItem: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
    paddingVertical: METRICS.padding * 1.8,
    backgroundColor: COLORS.white,
  },
  settingsItemText: {
    textAlign: 'center',
    fontSize: METRICS.fontSize * 1.2,
    fontFamily: METRICS.fontFamilyBold,
  },
});
