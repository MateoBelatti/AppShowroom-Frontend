import React, { useEffect, useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import "./auth.css";
import { authService } from "../../services/auth.service";
import { useAuth } from "../../hooks/useAuth.hook";

interface AuthModalProps {
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const auth = useAuth();

    const handleGoogleSuccess = async (credentialResponse: any) => {
        console.log("Entrando en handler");
        
        if (credentialResponse.credential) {
            console.log("Adentro del if");
            
            try {
                console.log("En el try");
                
                const response = await authService.googleLogin(credentialResponse.credential);
                const res = response as { token: string };
                if (res.token) {
                    auth?.login(res.token);
                    setTimeout(() => onClose(), 1000);
                }
                console.log("termino el try");
                
            } catch (error) {
                console.error("Error logging in with Google", error);
            }
        }
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    return (
        <div className="login-overlay d-flex align-items-center justify-content-center" onClick={onClose}>

            <div className="login-modal-container position-relative" onClick={(e) => e.stopPropagation()}>

                <button className="close-modal-btn position-absolute" onClick={onClose} aria-label="Cerrar">
                    ×
                </button>

                <div className="container-fluid h-100 p-0">
                    <div className="row h-100 g-0">

                        {/* PARTE IZQUIERDA */}
                        <div className="col-lg-7 d-flex flex-column justify-content-center px-4 px-md-5 py-5 text-white">
                            <h1 className="login-title mb-3">
                                {isLogin ? "INICIAR SESIÓN" : "REGISTRO"}
                            </h1>
                            <p className="login-subtitle mb-4">
                                {isLogin ? "¡Hola, bienvenido de nuevo!" : "¡Únete hoy mismo!"}
                            </p>
                            <p className="login-sub-text mb-5">
                                {isLogin
                                    ? "Esperamos que hayas tenido un gran día"
                                    : "Crea una cuenta para desbloquear todas las funciones"}
                            </p>

                            <div className="mb-4 d-flex justify-content-center w-100 google-login-wrapper">
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={() => {
                                        console.error('Google Login Failed');
                                    }}
                                    theme="filled_black"
                                    shape="rectangular"
                                    text="continue_with"
                                />
                            </div>

                            <p className="signup-prompt mt-auto mb-0">
                                {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
                                <span
                                    className="toggle-mode-link"
                                    onClick={() => setIsLogin(!isLogin)}
                                >
                                    {isLogin ? "Regístrate" : "Inicia Sesión"}
                                </span>
                            </p>
                        </div>

                        {/* PARTE DERECHA*/}
                        <div className="col-lg-5 d-flex align-items-center justify-content-center px-3 px-md-4 py-5">
                            <div className="embedded-form-card w-100">

                                {/* SELECTOR LOGIN / REGISTER */}
                                <div className="mode-selector mb-4 d-flex">
                                    <button
                                        className={`selector-btn flex-fill ${isLogin ? 'active' : ''}`}
                                        onClick={() => setIsLogin(true)}
                                    >
                                        Ingresar
                                    </button>
                                    <button
                                        className={`selector-btn flex-fill ${!isLogin ? 'active' : ''}`}
                                        onClick={() => setIsLogin(false)}
                                    >
                                        Registrarse
                                    </button>
                                </div>

                                {isLogin ? <LoginForm onClose={onClose} /> : <RegisterForm onClose={onClose} />}

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AuthModal;