import React from 'react';

import { View, StyleSheet } from 'react-native';

import { normalize } from 'react-native-elements';

import Text from '../Text';
import { COLORS, METRICS } from '../../constants';
import { formatTimeToLocale } from '../../helpers';

export default function ChatMessage({ message }) {
  if (message?.type === 'sent') {
    return (
      <View style={[styles.message, styles.sentMessage]}>
        <Text>{message?.content}</Text>
        <Text style={styles.messageHour}>
          {message?.time && formatTimeToLocale(message.time)}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.message, styles.receivedMessage]}>
      <Text color={COLORS.primary} style={styles.messageUser}>
        {message?.user_name}
      </Text>
      <Text>{message?.content}</Text>
      <Text style={styles.messageHour}>
        {message?.time && formatTimeToLocale(message.time)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    backgroundColor: COLORS.white,
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(10),
    borderColor: COLORS.borderColor,
    borderWidth: normalize(1),
    borderRadius: METRICS.borderRadius,
    minWidth: '50%',
    maxWidth: '90%',
    marginBottom: normalize(METRICS.margin / 2),
  },
  receivedMessage: {
    alignSelf: 'flex-start',
  },
  sentMessage: {
    alignSelf: 'flex-end',
  },
  messageUser: {
    textAlign: 'left',
    marginBottom: normalize(5),
  },
  messageHour: {
    textAlign: 'right',
    fontSize: normalize(10),
    marginTop: normalize(5),
  },
});
