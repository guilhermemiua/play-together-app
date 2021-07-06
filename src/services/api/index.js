import axios from 'axios';

const BASE_URL = 'https://3354e745c826.ngrok.io';

const api = axios.create({
  baseURL: BASE_URL,
});

export { api, BASE_URL };
