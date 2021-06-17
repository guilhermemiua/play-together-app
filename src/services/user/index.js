import { getToken } from '../../helpers';
import { api } from '../api';

export const updateEmail = async (email) => {
  const token = await getToken();

  return api.put(
    '/update-email',
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
    '/update-password',
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
