import firebase from 'firebase';
import { getToken } from '../../helpers';
import { api } from '../api';

import { firebaseDB } from '../firebase';

export const sendEventMessage = async ({
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

export const createEvent = async ({
  sport,
  local,
  state_id,
  city_id,
  date,
  start_time,
  end_time,
  players_quantity,
}) => {
  const token = await getToken();

  return api.post(
    '/event',
    {
      sport,
      local,
      state_id,
      city_id,
      date,
      start_time,
      end_time,
      players_quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const editEvent = async (
  eventId,
  { local, state_id, city_id, date, start_time, end_time, players_quantity }
) => {
  const token = await getToken();

  return api.put(
    `/event/${eventId}`,
    {
      local,
      state_id,
      city_id,
      date,
      start_time,
      end_time,
      players_quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteEvent = async (eventId) => {
  const token = await getToken();

  return api.delete(`/event/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeUserFromEvent = async (eventId, userId) => {
  const token = await getToken();

  return api.delete(`/event/${eventId}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const joinEvent = async (eventId) => {
  const token = await getToken();

  return api.post(
    '/event/join',
    {
      event_id: eventId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const disjoinEvent = async (eventId) => {
  const token = await getToken();

  return api.post(
    '/event/disjoin',
    {
      event_id: eventId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getEvents = async ({ offset, limit, type }) => {
  const token = await getToken();

  const params = new URLSearchParams('');

  if (offset || offset === 0) params.append('offset', offset);
  if (limit) params.append('limit', limit);
  if (type) params.append('type', type);

  return api.get(`/event${params && `?${params.toString()}`}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getEvent = async (eventId) => {
  const token = await getToken();

  return api.get(`/event/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
