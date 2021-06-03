import axios from 'axios';

const api = axios.create({
  baseURL: 'https://f0356eb35c1a.ngrok.io',
});

export { api };
