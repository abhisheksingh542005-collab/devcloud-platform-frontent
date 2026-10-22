import axios from 'axios';

const API = axios.create({
  baseURL: 'https://devcloud-platform-backent.onrender.com/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;