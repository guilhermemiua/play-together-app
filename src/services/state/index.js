import { api } from '../api';
import { getToken } from '../../helpers';

export const getStates = async () => {
  const token = await getToken();

  return api.get('/state', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
