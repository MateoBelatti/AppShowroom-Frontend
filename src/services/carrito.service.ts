import apiClient from './http.client';
import type { 
    CarritoDto, 
    CarritoCreateDto, 
    CarritoUpdateDto 
} from '../types/carrito.interfaces';

const API_URL = '/carrito';

export const carritoService = {
    // GET: /api/carrito/usuario/{idUsuario}
    findByIdUsuario: async (idUsuario: number): Promise<CarritoDto> => {
        const response = await apiClient.get<CarritoDto>(`${API_URL}/usuario/${idUsuario}`);
        return response.data;
    },

    // GET: /api/carrito/{id}
    findById: async (id: number): Promise<CarritoDto> => {
        const response = await apiClient.get<CarritoDto>(`${API_URL}/${id}`);
        return response.data;
    },

    // POST: /api/carrito
    create: async (dataDto: CarritoCreateDto): Promise<CarritoDto> => {
        const response = await apiClient.post<CarritoDto>(API_URL, dataDto);
        return response.data;
    },

    // PUT: /api/carrito/{id}
    update: async (id: number, dataDto: CarritoUpdateDto): Promise<CarritoDto> => {
        const response = await apiClient.put<CarritoDto>(`${API_URL}/${id}`, dataDto);
        return response.data;
    },

    // DELETE: /api/carrito/{id}
    delete: async (id: number): Promise<boolean> => {
        const response = await apiClient.delete(`${API_URL}/${id}`);
        return response.status === 200 || response.status === 204;
    }
};
