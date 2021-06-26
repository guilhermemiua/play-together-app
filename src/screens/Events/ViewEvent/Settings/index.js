import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

import { COLORS, METRICS } from '../../../../constants';
import { notify } from '../../../../helpers';
import { useAuth } from '../../../../hooks/useAuth';
import { disjoinEvent } from '../../../../services';

export default function Settings({ route, navigation }) {
  const { t } = useTranslation();

  const { event } = route.params;

  const { loggedUser } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const toggleChangeLanguageModal = () => setIsOpen(!isOpen);

  const navigateToChangePassword = () => navigation.navigate('ChangePassword');

  const handleDisjoinButton = async () => {
    try {
      await disjoinEvent(event?.id);

      await navigation.navigate('Events');

      notify({ type: 'success', message: 'You left the event!' });
    } catch (error) {
      notify({ type: 'danger', message: 'Error lefting event' });
    }
  };

  return (
    <View style={styles.settings}>
      {event?.user_id === loggedUser.id && (
        <>
          <TouchableOpacity
            style={styles.settingsItem}
            onPress={toggleChangeLanguageModal}
          >
            <Text style={styles.settingsItemText}>
              {t('viewEvent.settings.editEvent')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingsItem}
            onPress={navigateToChangePassword}
          >
            <Text style={styles.settingsItemText}>
              {t('viewEvent.settings.deleteEvent')}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {event?.user_id !== loggedUser.id && (
        <TouchableOpacity
          style={styles.settingsItem}
          onPress={handleDisjoinButton}
        >
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
