import type { DetalleCarritoCreateDto, DetalleCarritoDto, DetalleCarritoUpdateDto } from "./detalleCarrito.interfaces";

export interface CarritoCreateDto {
    UsuarioId: number;
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
    refreshDetalles: () => Promise<void>;
    updateDetalle : (detalle : DetalleCarritoUpdateDto) => Promise<void>;
}
