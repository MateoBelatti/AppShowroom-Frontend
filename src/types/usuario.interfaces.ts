export interface UsuarioCreateDto{
    nombre : string;
    email : string;
    password : string;
    direccion? : string;
    telefono? : string;
}
export interface UsuarioDto{
    id : number;
    nombre : string;
    email : string;
    rol : Rol;
    direccion? : string;
    telefono?: string;
    ultimaConeccion? : Date;
}
export interface UsuarioUpdateDto{
    nombre : string;
    email : string;
    direccion? : string;
    telefono? : string;
}

export type Rol = "User" | "Admin";

/** El back serializa el enum Rol como número (0/1); toleramos también el string. */
export const normalizarRol = (rol: unknown): Rol =>
    rol === "Admin" || rol === 1 || rol === "1" ? "Admin" : "User";