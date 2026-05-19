import type { DetalleCarritoDto } from "./detalleCarrito.interfaces";

export interface CarritoCreateDto {
    idUsuario: number;
}
export interface CarritoDto {
    Id: number;
    UsuarioId: number;
    FechaCreacion: Date;
    UltimaVez: Date;
    Detalles: DetalleCarritoDto[];
}
export interface CarritoUpdateDto {
    Detalles: DetalleCarritoDto[];
}
