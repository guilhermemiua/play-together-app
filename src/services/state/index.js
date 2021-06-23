import { api } from '../api';

export const getStates = async () => api.get('/state');
