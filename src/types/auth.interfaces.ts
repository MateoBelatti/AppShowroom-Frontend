export interface LoginDto {
    email : string;
    password: string;
}

export type JwtPayload = {
    nombre : string;
    id: string;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string
};

export type AuthContextType = {
    user: JwtPayload | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    setUser: (user: JwtPayload | null) => void; 
};
