import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View, StyleSheet } from 'react-native';

import ChatMessageInput from '../../../../components/ChatMessageInput';
import ChatMessage from '../../../../components/ChatMessage';
import { COLORS, METRICS, normalize } from '../../../../constants';
import { useAuth } from '../../../../hooks/useAuth';
import { sendEventMessage } from '../../../../services';
import { formatFullName, notify } from '../../../../helpers';
import { firebaseDB } from '../../../../services/firebase';

export default function Chat({ route }) {
  const { t } = useTranslation();
  const { loggedUser } = useAuth();

  const { event } = route.params;

  const [messages, setMessages] = useState([]);

  let listener;

  const submitMessage = async (message) => {
    try {
      await sendEventMessage({
        message,
        senderId: loggedUser.id,
        senderName: formatFullName(loggedUser),
        chatRoomId: `event-${event.id}`,
      });
    } catch (error) {
      console.log(error);
      notify({ type: 'danger', message: t('eventChat.errorMessage') });
    }
  };

  const getMessages = async () => {
    listener = firebaseDB
      .collection(`event-${event?.id}`)
      .orderBy('created_at', 'desc')
      .onSnapshot((snap) => {
        const messageList = [];

        snap.forEach((doc) => {
          messageList.push({
            id: doc.id,
            user_name: doc.data().sender_name,
            type: loggedUser.id === doc.data().sender_id ? 'sent' : 'received',
            content: doc.data().message,
            time: new Date(doc.data().created_at * 1000),
          });
        });

        setMessages(messageList);
      });
  };

  useEffect(() => {
    if (event) {
      getMessages();
    }

    return () => {
      listener();
    };
  }, [event]);

  return (
    <>
      <View style={styles.chat}>
        <FlatList
          style={styles.messages}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatMessage message={item} />}
          inverted
        />
      </View>
      <ChatMessageInput onSubmitMessage={submitMessage} />
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
