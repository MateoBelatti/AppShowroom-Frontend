import React from "react";

const RegisterForm: React.FC = () => {
    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Procesando Registro...");
    };

    return (
        <form onSubmit={handleRegisterSubmit} className="d-flex flex-column gap-4 slide-down">
            <div className="form-group">
                <label htmlFor="register-name">Nombre</label>
                <input 
                    type="text" 
                    id="register-name" 
                    placeholder="E.g. John Doe" 
                    className="dark-input form-control shadow-none"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="register-email">E-Mail</label>
                <input 
                    type="email" 
                    id="register-email" 
                    placeholder="E.g. coursecrates@gmail.com" 
                    className="dark-input form-control shadow-none"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="register-password">Contraseña</label>
                <input 
                    type="password" 
                    id="register-password" 
                    placeholder="••••••••" 
                    className="dark-input form-control shadow-none"
                    required
                />
            </div>

            <button type="submit" className="btn-lavender-login mt-3">
                Crear Cuenta
            </button>
        </form>
    );
};

export default RegisterForm;