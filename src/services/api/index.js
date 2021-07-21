import axios from 'axios';

const BASE_URL = 'https://guilherme-eiti-tcc-api.herokuapp.com';

const api = axios.create({
  baseURL: BASE_URL,
});

export { api, BASE_URL };
