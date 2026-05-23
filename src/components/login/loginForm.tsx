import React from "react";

const LoginForm: React.FC = () => {
    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Procesando Login...");
    };

    return (
        <form onSubmit={handleLoginSubmit} className="d-flex flex-column gap-4 slide-down">
            <div className="form-group">
                <label htmlFor="login-email">E-Mail</label>
                <input 
                    type="email" 
                    id="login-email" 
                    placeholder="E.g. coursecrates@gmail.com" 
                    className="dark-input form-control shadow-none"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="login-password">Contraseña</label>
                <input 
                    type="password" 
                    id="login-password" 
                    placeholder="••••••••" 
                    className="dark-input form-control shadow-none"
                    required
                />
            </div>

            <button type="submit" className="btn-lavender-login mt-3">
                Iniciar Sesion
            </button>
        </form>
    );
};

export default LoginForm;