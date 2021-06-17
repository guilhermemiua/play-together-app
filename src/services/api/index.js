import axios from 'axios';

const api = axios.create({
  baseURL: 'https://f5d1d9b3a895.ngrok.io',
});

export { api };
