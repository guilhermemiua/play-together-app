import axios from 'axios';

const api = axios.create({
  baseURL: 'https://15667d851107.ngrok.io',
});

export { api };
