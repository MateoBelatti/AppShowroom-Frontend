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
    PrecioUnitario: Float32Array;
    Cantidad: number;
    Subtotal: Float32Array;
}

export interface DetalleCarritoUpdateDto {
    Id: number;
    Cantidad: number;
}