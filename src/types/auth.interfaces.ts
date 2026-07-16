export interface LoginDto {
    email : string;
    password: string;
}

export type JwtPayload = {
    id: string;
    nombre: string;
    rol: string;
    exp: number;
    iat: number;
};

export type AuthContextType = {
    user: JwtPayload | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    setUser: (user: JwtPayload | null) => void; 
};
