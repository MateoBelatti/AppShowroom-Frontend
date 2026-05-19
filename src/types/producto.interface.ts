import type { CategoriaDto } from "./categoria.interfaces";

export interface ProductoDto {
    Id: number;
    Nombre: string;
    Descripcion: string;
    Precio: number;
    Imagen: string;
    Stock : number;
    Activo : boolean;
    Tipo : number;
    Categoria: CategoriaDto[];
}
export interface ProductoCreateDto {
    Nombre: string;
    Descripcion: string;
    Precio: number;
    Activo: boolean;
    Tipo: number;
    Stock: number;
    Imagen: string;
    CategoriasId: number[];
}
export interface ProductoUpdateDto {
    Nombre: string;
    Descripcion: string;
    Precio: number;
    Imagen: string;
    Stock : number;
    Activo : Boolean;
    Tipo : number;
    CategoriasId: number[];
}