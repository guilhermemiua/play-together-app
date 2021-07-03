import { api } from '../api';

export const getCities = async ({ name = '', stateId = 1 }) => {
  const params = new URLSearchParams('');

  if (stateId) params.append('stateId', stateId);
  if (name) params.append('name', name);

  return api.get(`/city${params && `?${params.toString()}`}`);
};
