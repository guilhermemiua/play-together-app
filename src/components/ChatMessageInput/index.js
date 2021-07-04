import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import { Icon } from 'react-native-elements';
import Input from '../Input';
import { COLORS, METRICS } from '../../constants';

export default function ChatMessageInput({ onSubmitMessage }) {
  const { t } = useTranslation();

  const [message, setMessage] = useState('');

  return (
    <View style={styles.inputContainer}>
      <Input
        placeholder={t('chatMessageInput.messageLabel')}
        containerStyle={{
          width: '90%',
        }}
        onChangeText={(text) => setMessage(text)}
      />
      <TouchableOpacity onPress={() => onSubmitMessage(message)}>
        <Icon name="play" type="feather" color={COLORS.primary} size={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: METRICS.containerMarginHorizontal,
    paddingVertical: METRICS.containerMarginVertical,
  },
});
