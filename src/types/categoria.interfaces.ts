export interface CategoriaDto {
    id: number;
    nombre: string;
}
export interface CategoriaCreateDto {
    nombre: string;
}
export interface CategoriaUpdateDto {
    nombre: string;
    id : number;
}