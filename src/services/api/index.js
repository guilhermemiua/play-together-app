import axios from 'axios';

const BASE_URL = 'https://7566a134ad8b.ngrok.io';

const api = axios.create({
  baseURL: BASE_URL,
});

export { api, BASE_URL };
