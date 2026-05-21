import type { DetalleCarritoCreateDto, DetalleCarritoDto } from "./detalleCarrito.interfaces";

export interface CarritoCreateDto {
    idUsuario: number;
}
export interface CarritoDto {
    id: number;
    usuarioId: number;
    fechaCreacion: Date;
    ultimaVez: Date;
    detalles: DetalleCarritoDto[];
}
export interface CarritoUpdateDto {
    detalles: DetalleCarritoDto[];
}

export interface ICarritoContext{
    carrito : CarritoDto | null ;
    detalles : DetalleCarritoDto[],
    addDetalle : (detalle : DetalleCarritoCreateDto) => Promise<void>;
    removeDetalle : (idDetalle : number) => Promise<void>;
}
