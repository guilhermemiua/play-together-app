import { api } from '../api';

export const login = async (email, password) =>
  api.post('/authenticate', {
    email,
    password,
  });

export const register = async ({
  first_name,
  last_name,
  age,
  gender,
  email,
  password,
}) =>
  api.post('/register', {
    first_name,
    last_name,
    age,
    gender,
    email,
    password,
  });
