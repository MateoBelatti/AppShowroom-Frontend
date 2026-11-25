import { type ReactNode, useState, useEffect, useCallback } from "react";
import type { JwtPayload } from "../types/auth.interfaces";
import { AuthContext } from "./auth.context";
import { setLogoutCallback } from "../services/http.client";

const decodeJwt = (token: string): JwtPayload | null => {
    try {
        const payload = token.split('.')[1];
        const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(decoded);
    } catch {
        return null;
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<JwtPayload | null>(() => {
        const storedToken = localStorage.getItem("token");
        return storedToken ? decodeJwt(storedToken) : null;
    });
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
    const isAuthenticated = !!user;

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRol");

        setUser(null);
        setToken(null);
    }, []);

    useEffect(() => {
        setLogoutCallback(logout);
        const storedToken = localStorage.getItem("token");
        const decoded = storedToken ? decodeJwt(storedToken) : null;
        if (decoded) {
            localStorage.setItem('userId', decoded.id);
            localStorage.setItem('userRol', decoded.rol);
        }
    }, [logout]);

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);

        const decoded = decodeJwt(newToken);
        if (decoded) {
            setUser(decoded);
            localStorage.setItem('userId', decoded.id);
            localStorage.setItem('userRol', decoded.rol);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
