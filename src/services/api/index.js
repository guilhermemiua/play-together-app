import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://guilherme-eiti-tcc-api.herokuapp.com'
    : 'https://guilherme-eiti-tcc-api.herokuapp.com';

const api = axios.create({
  baseURL: BASE_URL,
});

export { api, BASE_URL };
