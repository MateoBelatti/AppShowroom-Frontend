import { useEffect, useState, useCallback } from "react"
import { type CategoriaDto, type CategoriaCreateDto, type CategoriaUpdateDto } from "../types/categoria.interfaces"
import { categoriaService } from "../services/categoria.service";

export const useCategorias = () => {
    const [categorias, setCategorias] = useState<CategoriaDto[]>([]);
    const [loadingCat, setLoading] = useState<boolean>(true);
    const [errorCat, setErrorCat] = useState<string | null>(null);

    const cargarCategorias = useCallback(async () => {
        setLoading(true);
        setErrorCat(null);
        try {
            const data = await categoriaService.getAll();
            setCategorias(data);
        } catch {
            setErrorCat("No se pudieron cargar las categorias");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        cargarCategorias();
    }, [cargarCategorias]);

    const addCategoria = async (data: CategoriaCreateDto) => {
        try {
            const nuevaCategoria = await categoriaService.create(data);
            setCategorias(prev => [...prev, nuevaCategoria]);
            return nuevaCategoria;
        } catch (err) {
            setErrorCat("No se pudo agregar la categoría");
            throw err;
        }
    };

    const updateCategoria = async (data: CategoriaUpdateDto) => {
        try {
            const categoriaActualizada = await categoriaService.update(data);
            setCategorias(prev => prev.map(c => c.id === data.id ? categoriaActualizada : c));
            return categoriaActualizada;
        } catch (err) {
            setErrorCat("No se pudo actualizar la categoría");
            throw err;
        }
    };

    const deleteCategoria = async (id: number) => {
        try {
            const success = await categoriaService.delete(id);
            if (success) {
                setCategorias(prev => prev.filter(c => c.id !== id));
            }
            return success;
        } catch (err) {
            setErrorCat("No se pudo eliminar la categoría");
            throw err;
        }
    };

    return {
        categorias,
        loadingCat,
        errorCat,
        addCategoria,
        updateCategoria,
        deleteCategoria,
    };
}