export interface LoginDto {
    Email : string;
    Password: string;
}

export type JwtPayload = {
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
