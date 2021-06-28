import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';

import { Icon, normalize } from 'react-native-elements';
import Input from '../../../../components/Input';
import Text from '../../../../components/Text';
import { COLORS, METRICS } from '../../../../constants';
import { useAuth } from '../../../../hooks/useAuth';

const messages = [
  {
    id: 1,
    content: `- Ajustes gerais do sistema (Cores, fontes, nomenclaturas)
    - Arrumado bug de não voltar para página correta após entrar em indicadores do serviço como cliente
    Commit: `,
  },
  {
    id: 2,
    content: `- Ajustes gerais do sistema (Cores, fontes, nomenclaturas)
    - Arrumado bug de não voltar para página correta após entrar em indicadores do serviço como cliente
    Commit: `,
  },
];

export default function Chat({ route, navigation }) {
  const { t } = useTranslation();

  const { event } = route.params;

  const { loggedUser } = useAuth();

  return (
    <>
      <View style={styles.chat}>
        <FlatList
          style={styles.messages}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.message, styles.sentMessage]}>
              <Text color={COLORS.primary} style={styles.messageUser}>
                Guilherme Eiti
              </Text>
              <Text>{item.content}</Text>
              <Text style={styles.messageHour}>23h32</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Message..."
          containerStyle={{
            width: '90%',
          }}
        />
        <TouchableOpacity>
          <Icon name="play" type="feather" color={COLORS.primary} size={25} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  chat: {
    flex: 1,
    backgroundColor: COLORS.screenBackgroundColor,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: METRICS.containerMarginHorizontal,
    paddingVertical: METRICS.containerMarginVertical,
  },
  messages: {
    paddingHorizontal: METRICS.containerMarginHorizontal,
  },
  message: {
    backgroundColor: COLORS.white,
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(10),
    borderColor: COLORS.borderColor,
    borderWidth: normalize(1),
    borderRadius: METRICS.borderRadius,
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
