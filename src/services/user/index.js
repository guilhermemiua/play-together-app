import { getToken } from '../../helpers';
import { api } from '../api';

export const getUsers = async ({ offset, limit, name }) => {
  const token = await getToken();

  const params = new URLSearchParams('');

  if (offset || offset === 0) params.append('offset', offset);
  if (limit) params.append('limit', limit);
  if (name) params.append('name', name);

  return api.get(`/user${params && `?${params.toString()}`}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendFriendRequest = async (receiverId) => {
  const token = await getToken();

  return api.post(
    '/friend-request',
    {
      receiver_id: receiverId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getSentFriendRequests = async ({ offset, limit }) => {
  const token = await getToken();

  const params = new URLSearchParams('');

  if (offset || offset === 0) params.append('offset', offset);
  if (limit) params.append('limit', limit);

  return api.get(`/friend-request/sent${params && `?${params.toString()}`}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getReceivedFriendRequests = async ({ offset, limit }) => {
  const token = await getToken();

  const params = new URLSearchParams('');

  if (offset || offset === 0) params.append('offset', offset);
  if (limit) params.append('limit', limit);

  return api.get(
    `/friend-request/received${params && `?${params.toString()}`}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
