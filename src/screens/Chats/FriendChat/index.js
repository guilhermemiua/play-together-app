import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View, StyleSheet } from 'react-native';

import ChatMessageInput from '../../../components/ChatMessageInput';
import ChatMessage from '../../../components/ChatMessage';
import { COLORS, METRICS, normalize } from '../../../constants';
import { useAuth } from '../../../hooks/useAuth';
import { firebaseDB } from '../../../services/firebase';
import { formatFullName, notify } from '../../../helpers';
import { sendFriendMessage } from '../../../services';

export default function FriendChat({ route, navigation }) {
  const { t } = useTranslation();

  const { friend } = route.params;

  const { loggedUser } = useAuth();

  const [messages, setMessages] = useState([]);

  let listener;

  const submitMessage = async (message) => {
    try {
      if (friend.id > loggedUser.id) {
        await sendFriendMessage({
          message,
          senderId: loggedUser.id,
          senderName: formatFullName(loggedUser),
          chatRoomId: `friend-${loggedUser.id}-${friend.id}`,
        });
      } else {
        await sendFriendMessage({
          message,
          senderId: loggedUser.id,
          senderName: formatFullName(loggedUser),
          chatRoomId: `friend-${friend.id}-${loggedUser.id}`,
        });
      }
    } catch (error) {
      console.log(error);
      notify({ type: 'danger', message: t('friendChat.errorMessage') });
    }
  };

  const getMessages = async () => {
    if (friend.id > loggedUser.id) {
      listener = firebaseDB
        .collection(`friend-${loggedUser.id}-${friend.id}`)
        .orderBy('created_at', 'desc')
        .onSnapshot((snap) => {
          const messageList = [];

          snap.forEach((doc) => {
            messageList.push({
              id: doc.id,
              user_name: doc.data().sender_name,
              type:
                loggedUser.id === doc.data().sender_id ? 'sent' : 'received',
              content: doc.data().message,
              time: new Date(doc.data().created_at * 1000),
            });
          });

          setMessages(messageList);
        });
    } else {
      listener = firebaseDB
        .collection(`friend-${friend.id}-${loggedUser.id}`)
        .orderBy('created_at', 'desc')
        .onSnapshot((snap) => {
          const messageList = [];

          snap.forEach((doc) => {
            messageList.push({
              id: doc.id,
              user_name: doc.data().sender_name,
              type:
                loggedUser.id === doc.data().sender_id ? 'sent' : 'received',
              content: doc.data().message,
              time: new Date(doc.data().created_at * 1000),
            });
          });

          setMessages(messageList);
        });
    }
  };

  useEffect(() => {
    if (friend && loggedUser) {
      getMessages();
    }

    return () => {
      listener();
    };
  }, [friend, loggedUser]);

  return (
    <>
      <View style={styles.chat}>
        <FlatList
          inverted
          style={styles.messages}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatMessage type={item?.type} message={item} />
          )}
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
