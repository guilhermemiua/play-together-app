import axios from 'axios';

const BASE_URL = 'https://33150ebd4dea.ngrok.io';

const api = axios.create({
  baseURL: BASE_URL,
});

export { api, BASE_URL };
