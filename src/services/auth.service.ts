import apiClient from './http.client';
import type { LoginDto } from '../types/auth.interfaces';

const API_URL = '/auth';

export interface AuthResponse {
    token: string;
}

export const authService = {
    // POST: /api/auth/login
    login: async (data: LoginDto): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>(`${API_URL}/login`, data);
        return response.data;
    },

    // POST: /api/auth/google
    googleLogin: async (idToken: string): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>(`${API_URL}/google`, { IdToken: idToken });
        return response.data;
    }
};
