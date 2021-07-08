import axios from 'axios';

const BASE_URL = 'https://a8b7b38c55f9.ngrok.io';

const api = axios.create({
  baseURL: BASE_URL,
});

export { api, BASE_URL };
