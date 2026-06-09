import { useEffect, useState, useCallback } from "react"
import type { UsuarioDto, UsuarioCreateDto, UsuarioUpdateDto } from "../types/usuario.interfaces"
import { usuarioService } from "../services/usuario.service";

export const useUsuarios = () => {
    const [usuarios, setUsuarios] = useState<UsuarioDto[]>([]);
    const [loadingUsuarios, setLoadingUsuarios] = useState<boolean>(true);
    const [errorUsuarios, setErrorUsuarios] = useState<string | null>(null);

    const cargarUsuarios = useCallback(async () => {
        setLoadingUsuarios(true);
        setErrorUsuarios(null);
        try {
            const data = await usuarioService.getAll();
            const usuariosMapeados: UsuarioDto[] = data.map((u: any) => ({
            ...u,
            rol: u.rol === 1 ? "Admin" : "User"
        }));
            setUsuarios(usuariosMapeados);
        } catch {
            setErrorUsuarios("No se pudieron cargar los usuarios");
        } finally {
            setLoadingUsuarios(false);
        }
    }, []);

    useEffect(() => {
        cargarUsuarios();
    }, [cargarUsuarios]);

    const addUsuario = async (data: UsuarioCreateDto) => {
        try {
            const nuevoUsuario = await usuarioService.create(data);
            setUsuarios(prev => [...prev, nuevoUsuario]);
            return nuevoUsuario;
        } catch (err) {
            setErrorUsuarios("No se pudo agregar el usuario");
            throw err;
        }
    };

    const updateUsuario = async (id: number, data: UsuarioUpdateDto) => {
        try {
            const usuarioActualizado = await usuarioService.update(id, data);
            setUsuarios(prev => prev.map(u => u.id === id ? usuarioActualizado : u));
            return usuarioActualizado;
        } catch (err) {
            setErrorUsuarios("No se pudo actualizar el usuario");
            throw err;
        }
    };

    const deleteUsuario = async (id: number) => {
        try {
            const success = await usuarioService.delete(id);
            if (success) {
                setUsuarios(prev => prev.filter(u => u.id !== id));
            }
            return success;
        } catch (err) {
            setErrorUsuarios("No se pudo eliminar el usuario");
            throw err;
        }
    };

    return {
        usuarios,
        loadingUsuarios,
        errorUsuarios,
        addUsuario,
        updateUsuario,
        deleteUsuario,
        cargarUsuarios
    };
}
