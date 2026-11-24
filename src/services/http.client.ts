import axios from 'axios';

let logoutCallback: (() => void) | null = null;

export const setLogoutCallback = (fn: () => void) => {
  logoutCallback = fn;
};
// VITE_API_URL es el host del backend (ej: http://localhost:5102).
// El back expone todo bajo /api, así que lo agregamos acá si no viene incluido.
const rawBaseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5102').replace(/\/+$/, '');
const baseURL = rawBaseUrl.endsWith('/api') ? rawBaseUrl : `${rawBaseUrl}/api`;

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Interceptor Request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Interceptor Response
apiClient.interceptors.response.use(
  (response) => {
    return response; 
  },
  (error) => {
    // Manejo global de errores
    if (error.response?.status === 401) {
      if (logoutCallback) {
        logoutCallback();
      } else {
        // Fallback si el callback no está listo todavía
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRol');
      }
      // Redirige al home
      window.location.replace('/');
      if (error.response.status === 500) {
        console.error('Error interno del servidor.');
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;