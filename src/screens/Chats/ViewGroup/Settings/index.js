import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

import { COLORS, METRICS } from '../../../../constants';
import { notify } from '../../../../helpers';
import { useAuth } from '../../../../hooks/useAuth';
import { deleteGroup, disjoinGroup } from '../../../../services';

export default function Settings({ route, navigation }) {
  const { t } = useTranslation();

  const { group } = route.params;

  const { loggedUser } = useAuth();

  const navigateToEditGroup = () =>
    navigation.navigate('EditGroup', {
      group,
    });

  const navigateToAddUsers = () =>
    navigation.navigate('AddUserToGroup', {
      group,
    });

  const handleDisjoin = async () => {
    try {
      await disjoinGroup(group?.id);

      await navigation.navigate('Chats');

      notify({
        type: 'success',
        message: t('viewGroup.settings.leftSuccessMessage'),
      });
    } catch (error) {
      notify({
        type: 'danger',
        message: t('viewGroup.settings.leftErrorMessage'),
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteGroup(group?.id);

      await navigation.navigate('Chats');

      notify({
        type: 'success',
        message: t('viewGroup.settings.deleteSuccessMessage'),
      });
    } catch (error) {
      notify({
        type: 'danger',
        message: t('viewGroup.settings.deleteErrorMessage'),
      });
    }
  };

  return (
    <View style={styles.settings}>
      {group?.user_id === loggedUser?.id && (
        <>
          <TouchableOpacity
            style={styles.settingsItem}
            onPress={navigateToAddUsers}
          >
            <Text style={styles.settingsItemText}>
              {t('viewGroup.settings.addUsers')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingsItem}
            onPress={navigateToEditGroup}
          >
            <Text style={styles.settingsItemText}>
              {t('viewGroup.settings.editGroup')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsItem} onPress={handleDelete}>
            <Text style={styles.settingsItemText}>
              {t('viewGroup.settings.deleteGroup')}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {group?.user_id !== loggedUser?.id && (
        <TouchableOpacity style={styles.settingsItem} onPress={handleDisjoin}>
          <Text style={styles.settingsItemText}>
            {t('viewGroup.settings.leftGroup')}
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
