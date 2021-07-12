import { getToken } from '../../helpers';
import { api } from '../api';

export const updateEmail = async (email) => {
  const token = await getToken();

  return api.put(
    '/me/update-email',
    {
      email,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updatePassword = async (password, confirm_password) => {
  const token = await getToken();

  return api.put(
    '/me/update-password',
    {
      password,
      confirm_password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateProfile = async ({
  first_name,
  last_name,
  age,
  gender,
  state_id,
  city_id,
  profile_image,
}) => {
  const token = await getToken();

  const data = new FormData();

  data.append('first_name', first_name);
  data.append('last_name', last_name);
  data.append('age', age);
  data.append('gender', gender);
  data.append('state_id', state_id);
  data.append('city_id', city_id);

  if (profile_image) {
    const fileName = profile_image.split('/').pop();
    const ext = profile_image.split('.').pop();

    data.append('profile_image', {
      uri: profile_image,
      name: fileName,
      type: `image/${ext}`,
    });
  }

  return api.put('/me', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getLoggedUser = async () => {
  const token = await getToken();

  return api.get('/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMyFriends = async ({ offset, limit }) => {
  const token = await getToken();

  const params = new URLSearchParams('');

  if (offset || offset === 0) params.append('offset', offset);
  if (limit) params.append('limit', limit);

  return api.get(`/me/friend${params && `?${params.toString()}`}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getFriendStatus = async (friendId) => {
  const token = await getToken();

  return api.get(`/me/friend/${friendId}/status`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeMyFriend = async (friendId) => {
  const token = await getToken();

  return api.delete(`/me/friend/${friendId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMyEvents = async ({ offset, limit, type }) => {
  const token = await getToken();

  const params = new URLSearchParams('');

  if (offset || offset === 0) params.append('offset', offset);
  if (limit) params.append('limit', limit);
  if (type) params.append('type', type);

  return api.get(`/me/event${params && `?${params.toString()}`}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMyGroups = async ({ offset, limit }) => {
  const token = await getToken();

  const params = new URLSearchParams('');

  if (offset || offset === 0) params.append('offset', offset);
  if (limit) params.append('limit', limit);

  return api.get(`/me/group${params && `?${params.toString()}`}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
