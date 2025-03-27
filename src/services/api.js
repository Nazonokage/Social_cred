import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5700/social_credit/api', // Add full path
  withCredentials: true,
});

export default api;