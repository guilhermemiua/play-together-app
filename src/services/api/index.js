import axios from 'axios';

const api = axios.create({
  baseURL: 'https://6ed25e537bf8.ngrok.io',
});

export { api };
