import React, { useState } from "react";
import { loginSchema } from "../../utils/validates/authValidate";
import { authService } from "../../services/auth.service";
import { useAuth } from "../../hooks/useAuth.hook";

interface LoginFormProps {
    onClose : () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({onClose}) => {
    const [ formData, setFormData] = useState({email : '', password : ''});
    const [ errorData, setErrorData] = useState<{email? : string, password? : string}>({})
    const [ loading, setLoading] = useState<boolean>(false);
    const [ loadingSuccess, setLoadingSucces] = useState<boolean>(false);
    const auth = useAuth();

    const handleLoginSubmit = async (e: React.FormEvent) => {
        console.log("BOTONCITO DE INCIIAR SESION");
        
        e.preventDefault();
        // verifica que esten bien los campos
        const result = loginSchema.safeParse(formData);
        console.log(formData);
        

        console.log(result);
        
        if (!result.success) {
            const rawErrors = result.error.flatten().fieldErrors;
            setErrorData({
                email: rawErrors.email?.[0],
                password: rawErrors.password?.[0],
            });
            console.log("antes de cortar donde cero");
            
        return;
        }
        console.log("Bien verigicado");
        

        try {
            setLoading(true);
            console.log("en el try");
            
            const response = await authService.login(formData);
            const res = response as { token : string, message : string};

            const token = res.token;
            if (!token) throw new Error("Token no proporcionado");

            auth?.login(token);   

            setLoadingSucces(true);

            setTimeout(()=> onClose(), 1800)

        } catch (error) {
            setLoadingSucces(false);
        } finally{
            console.log("termino el inicio");
            
            setLoading(false);
        }
    };


    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!e.target.name) return;
        setFormData({...formData, [e.target.name] : e.target.value});
        setErrorData({});
    }

    return (
        <form onSubmit={handleLoginSubmit} className="d-flex flex-column gap-4 slide-down">
            <div className="form-group">
                <label htmlFor="login-email">E-Mail</label>
                <input 
                    type="email" 
                    id="login-email" 
                    name="email"
                    value={formData.email}
                    placeholder="E.g. coursecrates@gmail.com" 
                    className="dark-input form-control shadow-none"
                    required
                    onChange={handleChange}
                />
                {errorData.email && (
                <div className="text-danger mt-1">{errorData.email}</div>
            )}
            </div>

            <div className="form-group">
                <label htmlFor="login-password">Contraseña</label>
                <input 
                    type="password" 
                    id="login-password" 
                    name="password"
                    value={formData.password}
                    placeholder="••••••••" 
                    className="dark-input form-control shadow-none"
                    required
                    onChange={handleChange}
                />
            </div>

            <button type="submit" className="btn-lavender-login mt-3">
                {loading ? "Ingresando" : "Iniciar Sesion"}
            </button>
            { loadingSuccess && (
                <div className="alert alert-success mt-3" role="alert">
                Registro exitoso
                </div>)
            }
        </form>
    );
};

export default LoginForm;