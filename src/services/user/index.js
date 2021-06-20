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

export const updateProfile = async ({
  first_name,
  last_name,
  age,
  gender,
  state,
  city,
  profile_image,
}) => {
  const token = await getToken();

  const data = new FormData();

  data.append('first_name', first_name);
  data.append('last_name', last_name);
  data.append('age', age);
  data.append('gender', gender);
  data.append('state', state);
  data.append('city', city);

  if (profile_image) {
    const fileName = profile_image.split('/').pop();
    const ext = profile_image.split('.').pop();

    data.append('profile_image', {
      uri: profile_image,
      name: fileName,
      type: `image/${ext}`,
    });
  }

  return api.put('/user', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};
