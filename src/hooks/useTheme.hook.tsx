import { useContext } from "react";
import { ThemeContext } from "../context/theme.context";

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("Error al cargar el Tema");
    }
    return context;
}
