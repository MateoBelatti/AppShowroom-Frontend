import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ThemeContext, type Tema } from "./theme.context";

const CLAVE_TEMA = "tema";

const obtenerTemaInicial = (): Tema => {
    try {
        const guardado = localStorage.getItem(CLAVE_TEMA);
        if (guardado === "light" || guardado === "dark") {
            return guardado;
        }
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
    } catch {
        // Sin acceso a localStorage o matchMedia: se usa el tema claro.
    }
    return "light";
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [tema, setTema] = useState<Tema>(obtenerTemaInicial);

    useEffect(() => {
        const raiz = document.documentElement;
        raiz.dataset.theme = tema;
        raiz.dataset.bsTheme = tema;
        try {
            localStorage.setItem(CLAVE_TEMA, tema);
        } catch {
            // Sin persistencia el tema sigue aplicando durante la sesión.
        }
    }, [tema]);

    const cambiarTema = useCallback(() => {
        setTema((actual) => (actual === "dark" ? "light" : "dark"));
    }, []);

    return (
        <ThemeContext.Provider value={{ tema, cambiarTema }}>
            {children}
        </ThemeContext.Provider>
    );
};
