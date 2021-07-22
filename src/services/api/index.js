import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://guilherme-eiti-tcc-api.herokuapp.com'
    : 'http://192.168.0.16:3333';

const api = axios.create({
  baseURL: BASE_URL,
});

export { api, BASE_URL };
