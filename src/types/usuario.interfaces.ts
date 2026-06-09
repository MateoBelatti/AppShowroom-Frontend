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

type Rol = "User" | "Admin";