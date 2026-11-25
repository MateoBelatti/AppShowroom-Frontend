import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/auth.provider.tsx'
import { CarritoProvider } from './context/carrito.context.tsx'
import { ThemeProvider } from './context/theme.provider.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "TU_CLIENT_ID_DE_GOOGLE";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <CarritoProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </CarritoProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
