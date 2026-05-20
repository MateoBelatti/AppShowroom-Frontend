export interface DetalleCarritoCreateDto {
    CarritoId: number;
    ProductoId: number;
    Cantidad: number;
}

export interface DetalleCarritoDto {
    Id: number;
    CarritoId: number;
    ProductoId: number;
    NombreProducto: string;
    ImagenProducto: string;
    PrecioUnitario: number;
    Cantidad: number;
    Subtotal: number;
}

export interface DetalleCarritoUpdateDto {
    Id: number;
    Cantidad: number;
}