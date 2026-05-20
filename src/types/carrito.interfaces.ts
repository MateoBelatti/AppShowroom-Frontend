import type { DetalleCarritoCreateDto, DetalleCarritoDto } from "./detalleCarrito.interfaces";

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

export interface ICarritoContext{
    carrito : CarritoDto | null ;
    detalles : DetalleCarritoDto[],
    addDetalle : (detalle : DetalleCarritoCreateDto) => Promise<void>;
    removeDetalle : (idDetalle : number) => Promise<void>;
}
