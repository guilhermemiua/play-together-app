import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { StyleSheet } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { HEADER_TITLE_STYLE } from '../../constants';

import Text from '../Text';

export default function GroupChatHeader({ title, group }) {
  const navigation = useNavigation();

  const navigateToViewGroup = () =>
    navigation.navigate('ViewGroup', {
      group,
      title: group.name,
    });

  return (
    <TouchableOpacity style={styles.headerButton} onPress={navigateToViewGroup}>
      <Text
        style={{
          ...HEADER_TITLE_STYLE,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerButton: {},
});
