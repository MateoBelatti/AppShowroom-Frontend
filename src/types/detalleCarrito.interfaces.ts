export interface DetalleCarritoCreateDto {
    carritoId: number;
    productoId: number;
    cantidad: number;
}

export interface DetalleCarritoDto {
    id: number;
    carritoId: number;
    productoId: number;
    nombreProducto: string;
    imagenProducto: string;
    precioUnitario: number;
    cantidad: number;
    subtotal: number;
}

export interface DetalleCarritoUpdateDto {
    id: number;
    cantidad: number;
}