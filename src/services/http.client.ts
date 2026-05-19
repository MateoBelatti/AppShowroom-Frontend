import axios from 'axios';

// 1. Creamos la instancia base
const apiClient = axios.create({
  // Usamos la variable de entorno de Vite. Si no existe, usa un localhost por defecto.
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000, // Cancela la petición si tarda más de 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Interceptor de Petición (Request)
// Esto se ejecuta ANTES de que la petición salga hacia el backend
apiClient.interceptors.request.use(
  (config) => {
    // Buscamos el token de sesión (podría estar en localStorage, Zustand, Redux, etc.)
    const token = localStorage.getItem('token');
    
    // Si hay token, lo inyectamos en los headers de autorización
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Interceptor de Respuesta (Response)
// Esto se ejecuta CUANDO el backend responde, antes de que llegue a tu componente
apiClient.interceptors.response.use(
  (response) => {
    // Si todo sale bien, devolvemos la respuesta tal cual
    // (Algunos prefieren devolver solo "response.data" acá para escribir menos en el frontend)
    return response; 
  },
  (error) => {
    // Manejo global de errores
    if (error.response) {
      // Ejemplo: Si el backend dice que no estamos autorizados (token vencido o inválido)
      if (error.response.status === 401) {
        console.error('Sesión expirada. Por favor, volvé a iniciar sesión.');
        // Acá podrías borrar el token del localStorage y redirigir al /login
        // localStorage.removeItem('token');
        // window.location.href = '/login';
      }
      
      // Ejemplo: Error del servidor
      if (error.response.status === 500) {
        console.error('Error interno del servidor.');
      }
    }
    
    // Rechazamos la promesa para que el "catch" de tu componente pueda manejar su propio error si quiere
    return Promise.reject(error);
  }
);

export default apiClient;