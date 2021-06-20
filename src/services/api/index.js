import axios from 'axios';

const BASE_URL = 'https://a04713a56902.ngrok.io';

const api = axios.create({
  baseURL: BASE_URL,
});

export { api, BASE_URL };
