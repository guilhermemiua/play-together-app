import { api } from '../api';

export const updatePasswordByEmail = async (email, password) =>
  api.post('/forgot-password/new-password', {
    email,
    password,
  });

export const validateToken = async (email, token) =>
  api.post('/forgot-password/token', {
    email,
    token,
  });

export const forgotPassword = async (email) =>
  api.post('/forgot-password', {
    email,
  });

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
  state_id,
  city_id,
}) =>
  api.post('/register', {
    first_name,
    last_name,
    age,
    gender,
    email,
    password,
    state_id,
    city_id,
  });
