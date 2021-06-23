import { api } from '../api';

export const getCities = async ({ name = '', stateId = 1 }) =>
  api.get(`/city?name=${name}&stateId=${stateId}`);
