import firebase from 'firebase';
import { getToken } from '../../helpers';
import { api } from '../api';

import { firebaseDB } from '../firebase';

export const sendGroupMessage = async ({
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

export const createGroup = async ({ name, group_image }) => {
  const token = await getToken();

  const data = new FormData();

  data.append('name', name);

  if (group_image) {
    const fileName = group_image.split('/').pop();
    const ext = group_image.split('.').pop();

    data.append('group_image', {
      uri: group_image,
      name: fileName,
      type: `image/${ext}`,
    });
  }

  return api.post('/group', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const editGroup = async (groupId, { name, group_image }) => {
  const token = await getToken();

  const data = new FormData();

  data.append('name', name);

  if (group_image) {
    const fileName = group_image.split('/').pop();
    const ext = group_image.split('.').pop();

    data.append('group_image', {
      uri: group_image,
      name: fileName,
      type: `image/${ext}`,
    });
  }

  return api.put(`/group/${groupId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteGroup = async (groupId) => {
  const token = await getToken();

  return api.delete(`/group/${groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeUserFromGroup = async (groupId, userId) => {
  const token = await getToken();

  return api.delete(`/group/${groupId}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addUserToGroup = async (groupId, userId) => {
  const token = await getToken();

  return api.post(
    '/group/add-user',
    {
      group_id: groupId,
      user_id: userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const joinGroup = async (groupId) => {
  const token = await getToken();

  return api.post(
    '/group/join',
    {
      group_id: groupId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const disjoinGroup = async (groupId) => {
  const token = await getToken();

  return api.post(
    '/group/disjoin',
    {
      group_id: groupId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getGroups = async ({ offset, limit }) => {
  const token = await getToken();

  const params = new URLSearchParams('');

  if (offset || offset === 0) params.append('offset', offset);
  if (limit) params.append('limit', limit);

  return api.get(`/group${params && `?${params.toString()}`}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getGroup = async (groupId) => {
  const token = await getToken();

  return api.get(`/group/${groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
