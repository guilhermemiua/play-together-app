import axios from 'axios';

const BASE_URL = 'https://7e663ac0e88e.ngrok.io';

const api = axios.create({
  baseURL: BASE_URL,
});

export { api, BASE_URL };
