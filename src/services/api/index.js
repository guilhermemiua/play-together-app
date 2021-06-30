import axios from 'axios';

const BASE_URL = 'https://1a0e90fc97f4.ngrok.io';

const api = axios.create({
  baseURL: BASE_URL,
});

export { api, BASE_URL };
