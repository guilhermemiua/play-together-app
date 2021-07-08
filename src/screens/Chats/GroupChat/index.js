import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View, StyleSheet } from 'react-native';

import ChatMessageInput from '../../../components/ChatMessageInput';
import ChatMessage from '../../../components/ChatMessage';
import { COLORS, METRICS, normalize } from '../../../constants';
import { useAuth } from '../../../hooks/useAuth';

const messages = [
  {
    id: 1,
    content: `- Ajustes gerais do sistema (Cores, fontes, nomenclaturas)
    - Arrumado bug de não voltar para página correta após entrar em indicadores do serviço como cliente
    Commit: `,
    type: 'sent',
    time: '23h32',
  },
  {
    id: 2,
    content: `- Ajustes gerais do sistema (Cores, fontes, nomenclaturas)
    - Arrumado bug de não voltar para página correta após entrar em indicadores do serviço como cliente
    Commit: `,
    type: 'received',
    user: {
      name: 'Guilherme Eiti',
    },
    time: '23h34',
  },
  {
    id: 3,
    content: `- Ajustes gerais do sistema (Cores, fontes, nomenclaturas)
    - Arrumado bug de não voltar para página correta após entrar em indicadores do serviço como cliente
    Commit: `,
    type: 'received',
    user: {
      name: 'Guilherme Eiti',
    },
    time: '23h34',
  },
  {
    id: 4,
    content: `- Ajustes gerais do sistema (Cores, fontes, nomenclaturas)
    - Arrumado bug de não voltar para página correta após entrar em indicadores do serviço como cliente
    Commit: `,
    type: 'received',
    user: {
      name: 'Guilherme Eiti',
    },
    time: '23h34',
  },
  {
    id: 5,
    content: `- Ajustes gerais do sistema (Cores, fontes, nomenclaturas)
    - Arrumado bug de não voltar para página correta após entrar em indicadores do serviço como cliente
    Commit: `,
    type: 'received',
    user: {
      name: 'Guilherme Eiti',
    },
    time: '23h34',
  },
  {
    id: 6,
    content: `- Ajustes gerais do sistema (Cores, fontes, nomenclaturas)
    - Arrumado bug de não voltar para página correta após entrar em indicadores do serviço como cliente
    Commit: `,
    type: 'received',
    user: {
      name: 'Guilherme Eiti',
    },
    time: '23h34',
  },
];

export default function GroupChat({ route, navigation }) {
  const { t } = useTranslation();

  const { friend } = route.params;

  const { loggedUser } = useAuth();

  return (
    <>
      <View style={styles.chat}>
        <FlatList
          style={styles.messages}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatMessage type={item?.type} message={item} />
          )}
        />
      </View>
      <ChatMessageInput />
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
    marginTop: normalize(METRICS.margin / 2),
    paddingHorizontal: METRICS.containerMarginHorizontal,
  },
});
