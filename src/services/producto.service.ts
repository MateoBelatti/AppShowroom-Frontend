import apiClient from './http.client';
import type { ProductoDto, ProductoCreateDto, ProductoUpdateDto } from '../types/producto.interface';

const API_URL = '/producto';

export const productoService = {
    // GET: /api/producto
    getAll: async (): Promise<ProductoDto[]> => {
        const response = await apiClient.get<ProductoDto[]>(API_URL);
        return response.data;
    },

    // GET: /api/producto/activos
    getAllActivos: async (): Promise<ProductoDto[]> => {
        const response = await apiClient.get<ProductoDto[]>(`${API_URL}/activos`);
        return response.data;
    },

    // GET: /api/producto/categoria/{categoriaId}
    getByCategoria: async (categoriaId: number): Promise<ProductoDto[]> => {
        const response = await apiClient.get<ProductoDto[]>(`${API_URL}/categoria/${categoriaId}`);
        return response.data;
    },

    // GET: /api/producto/{id}
    findById: async (id: number): Promise<ProductoDto> => {
        const response = await apiClient.get<ProductoDto>(`${API_URL}/${id}`);
        return response.data;
    },

    // POST: /api/producto
    create: async (dataDto: ProductoCreateDto): Promise<ProductoDto> => {
        const response = await apiClient.post<ProductoDto>(API_URL, dataDto);
        return response.data;
    },

    // PUT: /api/producto/{id}
    update: async (id: number, dataDto: ProductoUpdateDto): Promise<ProductoDto> => {
        const response = await apiClient.put<ProductoDto>(`${API_URL}/${id}`, dataDto);
        return response.data;
    },

    // DELETE: /api/producto/{id}
    delete: async (id: number): Promise<boolean> => {
        const response = await apiClient.delete(`${API_URL}/${id}`);
        return response.status === 200 || response.status === 204;
    }
};
