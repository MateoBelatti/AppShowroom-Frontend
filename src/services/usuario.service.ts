import apiClient from './http.client';
import type { UsuarioDto, UsuarioCreateDto, UsuarioUpdateDto } from '../types/usuario.interfaces';

const API_URL = '/usuario';

export const usuarioService = {
    // GET: /api/usuario
    getAll: async (): Promise<UsuarioDto[]> => {
        const response = await apiClient.get<UsuarioDto[]>(API_URL);
        return response.data;
    },

    // GET: /api/usuario/{id}
    findById: async (id: number): Promise<UsuarioDto> => {
        const response = await apiClient.get<UsuarioDto>(`${API_URL}/${id}`);
        return response.data;
    },

    // POST: /api/usuario
    create: async (dataDto: UsuarioCreateDto): Promise<UsuarioDto> => {
        const response = await apiClient.post<UsuarioDto>(API_URL, dataDto);
        return response.data;
    },

    // PUT: /api/usuario/{id}
    update: async (id: number, dataDto: UsuarioUpdateDto): Promise<UsuarioDto> => {
        const response = await apiClient.put<UsuarioDto>(`${API_URL}/${id}`, dataDto);
        return response.data;
    },

    // DELETE: /api/usuario/{id}
    delete: async (id: number): Promise<boolean> => {
        const response = await apiClient.delete(`${API_URL}/${id}`);
        return response.status === 200 || response.status === 204;
    }
};
