import axios from 'axios';

const BASE_URL = 'https://2479e36c492b.ngrok.io';

const api = axios.create({
  baseURL: BASE_URL,
});

export { api, BASE_URL };
