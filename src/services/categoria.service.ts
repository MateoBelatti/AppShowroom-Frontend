import apiClient from './http.client';
import type {
    CategoriaDto,
    CategoriaCreateDto,
    CategoriaUpdateDto
} from '../types/categoria.interfaces';

const API_URL = '/categoria';

export const categoriaService = {
    // GET: /api/categoria
    getAll: async (): Promise<CategoriaDto[]> => {
        const response = await apiClient.get<CategoriaDto[]>(API_URL);
        return response.data;
    },

    // GET: /api/categoria/{id}
    findById: async (id: number): Promise<CategoriaDto> => {
        const response = await apiClient.get<CategoriaDto>(`${API_URL}/${id}`);
        return response.data;
    },

    // POST: /api/categoria
    create: async (dataDto: CategoriaCreateDto): Promise<CategoriaDto> => {
        const response = await apiClient.post<CategoriaDto>(API_URL, dataDto);
        return response.data;
    },

    // PUT: /api/categoria/{id}
    update: async (id: number, dataDto: CategoriaUpdateDto): Promise<CategoriaDto> => {
        const response = await apiClient.put<CategoriaDto>(`${API_URL}/${id}`, dataDto);
        return response.data;
    },

    // DELETE: /api/categoria/{id}
    delete: async (id: number): Promise<boolean> => {
        const response = await apiClient.delete(`${API_URL}/${id}`);
        return response.status === 200 || response.status === 204;
    }
};
