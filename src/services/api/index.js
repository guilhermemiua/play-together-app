import axios from 'axios';

const BASE_URL = 'https://95387bd06ff1.ngrok.io';

const api = axios.create({
  baseURL: BASE_URL,
});

export { api, BASE_URL };
