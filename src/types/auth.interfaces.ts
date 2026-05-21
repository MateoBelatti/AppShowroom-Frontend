export interface LoginDto {
    email : string;
    password: string;
}

export type JwtPayload = {
    nombre : string;
    id: string;
    rol: string
};

export type AuthContextType = {
    user: JwtPayload | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    setUser: (user: JwtPayload | null) => void; 
};
