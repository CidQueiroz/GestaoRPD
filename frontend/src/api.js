// GestaoRPD/frontend/src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/'
});

api.interceptors.request.use(
  config => {
    // Agora busca o Firebase ID Token diretamente
    const firebaseIdToken = localStorage.getItem('firebaseIdToken');
    if (firebaseIdToken) {
      // O token é armazenado como string JSON, então precisamos fazer parse
      const parsedToken = JSON.parse(firebaseIdToken);
      config.headers['Authorization'] = `Bearer ${parsedToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;