import type { CategoriaDto } from "./categoria.interfaces";

export interface ProductoDto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    stock : number;
    activo : boolean;
    tipo : number;
    categorias: CategoriaDto[];
}
export interface ProductoCreateDto {
    nombre: string;
    descripcion: string;
    precio: number;
    activo: boolean;
    tipo: number;
    stock: number;
    imagen: string;
    categoriasId: number[];
}
export interface ProductoUpdateDto {
    id : number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    stock : number;
    activo : boolean;
    tipo : number;
    categoriasId: number[];
}