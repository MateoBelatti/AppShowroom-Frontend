import React, { useState } from "react";
import { registerSchema } from "../../utils/validates/authValidate";
import { usuarioService } from "../../services/usuario.service";

interface RegisterFormProps {
    onClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });
    const [errorData, setErrorData] = useState<{ nombre?: string, email?: string, password?: string }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingSuccess, setLoadingSuccess] = useState<boolean>(false);

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = registerSchema.safeParse(formData);

        if (!result.success) {
            const rawErrors = result.error.flatten().fieldErrors;
            setErrorData({
                nombre: rawErrors.nombre?.[0],
                email: rawErrors.email?.[0],
                password: rawErrors.password?.[0],
            });
            return;
        }

        try {
            setLoading(true);

            await usuarioService.create(formData);

            setLoadingSuccess(true);
            setTimeout(() => onClose(), 1800);

        } catch (error) {
            setLoadingSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!e.target.name) return;
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorData({});
    }

    return (
        <form onSubmit={handleRegisterSubmit} className="d-flex flex-column gap-4 slide-down">
            <div className="form-group">
                <label htmlFor="register-name">Nombre</label>
                <input
                    type="text"
                    id="register-name"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="E.g. John Doe"
                    className="dark-input form-control shadow-none"
                    required
                />
                {errorData.nombre && (
                    <div className="text-danger mt-1">{errorData.nombre}</div>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="register-email">E-Mail</label>
                <input
                    type="email"
                    id="register-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E.g. coursecrates@gmail.com"
                    className="dark-input form-control shadow-none"
                    required
                />
                {errorData.email && (
                    <div className="text-danger mt-1">{errorData.email}</div>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="register-password">Contraseña</label>
                <input
                    type="password"
                    id="register-password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="dark-input form-control shadow-none"
                    required
                />
                {errorData.password && (
                    <div className="text-danger mt-1">{errorData.password}</div>
                )}
            </div>

            <button type="submit" className="btn-lavender-login mt-3" disabled={loading}>
                {loading ? "Creando Cuenta..." : "Crear Cuenta"}
            </button>
            {loadingSuccess && (
                <div className="alert alert-success mt-3" role="alert">
                    Registro exitoso
                </div>
            )}
        </form>
    );
};

export default RegisterForm;