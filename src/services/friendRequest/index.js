import { getToken } from '../../helpers';
import { api } from '../api';

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

export const getTotalReceivedFriendRequests = async () => {
  const token = await getToken();

  return api.get(`/friend-request/received/total`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const acceptFriendRequest = async (friendRequestId) => {
  const token = await getToken();

  return api.post(
    '/friend-request/accept',
    {
      friend_request_id: friendRequestId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const declineFriendRequest = async (friendRequestId) => {
  const token = await getToken();

  return api.post(
    '/friend-request/decline',
    {
      friend_request_id: friendRequestId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const cancelFriendRequest = async (friendRequestId) => {
  const token = await getToken();

  return api.post(
    '/friend-request/cancel',
    {
      friend_request_id: friendRequestId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
