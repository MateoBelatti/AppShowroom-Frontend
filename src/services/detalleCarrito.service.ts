import apiClient from './http.client';
import type {
    DetalleCarritoDto,
    DetalleCarritoCreateDto,
    DetalleCarritoUpdateDto
} from '../types/detalleCarrito.interfaces';

const API_URL = '/detalleCarrito';

export const detalleCarritoService = {
    // GET: /api/detalleCarrito/{idCarrito}
    findAllByIdCarrito: async (idCarrito: number): Promise<DetalleCarritoDto[]> => {
        const response = await apiClient.get<DetalleCarritoDto[]>(`${API_URL}/${idCarrito}`);
        return response.data;
    },

    // POST: /api/detalleCarrito
    create: async (dataDto: DetalleCarritoCreateDto): Promise<DetalleCarritoDto> => {
        const response = await apiClient.post<DetalleCarritoDto>(API_URL, dataDto);
        return response.data;
    },

    // PUT: /api/detalleCarrito/{id}
    update: async (dataDto: DetalleCarritoUpdateDto): Promise<DetalleCarritoDto> => {
        const response = await apiClient.put<DetalleCarritoDto>(`${API_URL}`, dataDto);
        console.log(response);
        return response.data;
    },

    // DELETE: /api/detalleCarrito/{id}
    delete: async (id: number): Promise<boolean> => {
        const response = await apiClient.delete(`${API_URL}/${id}`);
        return response.status === 200 || response.status === 204;
    }
};
