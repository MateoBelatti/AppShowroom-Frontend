import { useCallback, useEffect, useState } from "react"
import { type ProductoCreateDto, type ProductoDto, type ProductoUpdateDto } from "../types/producto.interface"
import { productoService } from "../services/producto.service";

export const useProduct = () => {
    const [productos, setProductos] = useState<ProductoDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProduct = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await productoService.getAll();
            setProductos(data);
        } catch {
            setError("No se pudieron cargar los productos");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProduct();
    }, [fetchProduct]);

    const deleteProduct = async (idProducto: number) => {
        try {
            await productoService.delete(idProducto);
            setProductos(prev => prev.filter(p => p.id !== idProducto));
        } catch (err) {
            setError("No se pudo eliminar el producto");
            throw err;
        }
    };

    const addProduct = async (data: ProductoCreateDto) => {
        try {
            await productoService.create(data);
            await fetchProduct();
        } catch (err) {
            setError("No se pudo crear el producto");
            throw err;
        }
    };

    const updateProduct = async (data: ProductoUpdateDto) => {
        try {
            await productoService.update(data);
            await fetchProduct();
        } catch (err) {
            setError("No se pudo actualizar el producto");
            throw err;
        }
    };

    return { productos, loading, error, fetchProduct, deleteProduct, addProduct, updateProduct };
};
