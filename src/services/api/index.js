import axios from 'axios';

const BASE_URL = 'https://de062b595b61.ngrok.io';

const api = axios.create({
  baseURL: BASE_URL,
});

export { api, BASE_URL };
