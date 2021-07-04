import { getToken } from '../../helpers';
import { api } from '../api';

export const getUsers = async ({ offset, limit, name, notFriends }) => {
  const token = await getToken();

  const params = new URLSearchParams('');

  if (offset || offset === 0) params.append('offset', offset);
  if (limit) params.append('limit', limit);
  if (name) params.append('name', name);
  if (notFriends) params.append('notFriends', notFriends);

  return api.get(`/user${params && `?${params.toString()}`}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
