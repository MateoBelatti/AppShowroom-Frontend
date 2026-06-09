import { type ReactNode, useState, useEffect } from "react";
import type { JwtPayload } from "../types/auth.interfaces";
import { AuthContext } from "./auth.context";
import { setLogoutCallback } from "../services/http.client";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<JwtPayload | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const isAuthenticated = !!user;

    useEffect(() => {
        setLogoutCallback(logout);
        const storedToken = localStorage.getItem("token");
        if (!storedToken) return;

        setToken(storedToken);
        const decoded = decodeJwt(storedToken);
        if (decoded) {
        setUser(decoded);
        localStorage.setItem('userId', decoded.id);
        localStorage.setItem('userRol', decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
        }
    }, []);

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);

        const decoded = decodeJwt(newToken);
        if (decoded) {
            setUser(decoded);
            localStorage.setItem('userId', decoded.id);
            localStorage.setItem('userRol', decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRol");

        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};


const decodeJwt = (token: string): JwtPayload | null => {
    try {
        const payload = token.split('.')[1];
        const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(decoded);
    } catch {
        return null;
    }
};