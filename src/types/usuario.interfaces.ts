export interface UsuarioCreateDto{
    Nombre : string;
    Email : string;
    Passwrod : string;
    Direccion? : string;
    Telefono? : string;
}
export interface UsuarioDto{
    Id : number;
    Nombre : string;
    Email : string;
    Rol : Rol;
    Direccion? : string;
    telefono?: string;
    UltimaConeccion? : Date;
}
export interface UsuarioUpdateDto{
    Nombre : string;
    Email : string;
    Direccion? : string;
    Telefono? : string;
}

type Rol = "User" | "Admin";