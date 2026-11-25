import { useEffect, useState, useCallback } from "react"
import type { UsuarioDto, UsuarioCreateDto, UsuarioUpdateDto } from "../types/usuario.interfaces"
import { normalizarRol } from "../types/usuario.interfaces"
import { usuarioService } from "../services/usuario.service";

const normalizar = (usuario: UsuarioDto): UsuarioDto => ({ ...usuario, rol: normalizarRol(usuario.rol) });

export const useUsuarios = () => {
    const [usuarios, setUsuarios] = useState<UsuarioDto[]>([]);
    const [loadingUsuarios, setLoadingUsuarios] = useState<boolean>(true);
    const [errorUsuarios, setErrorUsuarios] = useState<string | null>(null);

    const cargarUsuarios = useCallback(async () => {
        setLoadingUsuarios(true);
        setErrorUsuarios(null);
        try {
            const data = await usuarioService.getAll();
            setUsuarios(data.map(normalizar));
        } catch {
            setErrorUsuarios("No se pudieron cargar los usuarios");
        } finally {
            setLoadingUsuarios(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarUsuarios();
    }, [cargarUsuarios]);

    const addUsuario = async (data: UsuarioCreateDto) => {
        try {
            const nuevoUsuario = normalizar(await usuarioService.create(data));
            setUsuarios(prev => [...prev, nuevoUsuario]);
            return nuevoUsuario;
        } catch (err) {
            setErrorUsuarios("No se pudo agregar el usuario");
            throw err;
        }
    };

    const updateUsuario = async (id: number, data: UsuarioUpdateDto) => {
        try {
            const usuarioActualizado = normalizar(await usuarioService.update(id, data));
            setUsuarios(prev => prev.map(u => u.id === id ? usuarioActualizado : u));
            return usuarioActualizado;
        } catch (err) {
            setErrorUsuarios("No se pudo actualizar el usuario");
            await cargarUsuarios();
            throw err;
        }
    };

    const deleteUsuario = async (id: number) => {
        try {
            await usuarioService.delete(id);
            setUsuarios(prev => prev.filter(u => u.id !== id));
            return true;
        } catch (err) {
            setErrorUsuarios("No se pudo eliminar el usuario");
            await cargarUsuarios();
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
        cargarUsuarios,
    };
};
