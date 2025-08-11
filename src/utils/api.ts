import axios from 'axios';

const api = axios.create({
  baseURL: 'https://qlc-bo-dev.qatarliving.com/api/v2/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
