import firebase from 'firebase';

import { firebaseDB } from '../firebase';

export const sendFriendMessage = async ({
  senderId,
  senderName,
  message,
  chatRoomId,
}) =>
  firebaseDB.collection(chatRoomId).add({
    message,
    sender_id: senderId,
    sender_name: senderName,
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
  });
