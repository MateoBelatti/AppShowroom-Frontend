import { createContext } from "react";

export type Tema = "light" | "dark";

export interface IThemeContext {
    tema: Tema;
    cambiarTema: () => void;
}

export const ThemeContext = createContext<IThemeContext | null>(null);
