import { useEffect, useState } from "react"
import { type ProductoDto } from "../types/producto.interface"
import { productoService } from "../services/producto.service";

export const useProduct = () => {
    const [ productos, setProductos ] = useState<ProductoDto[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(()=>{
        try{
            const cargarProductos = async () => {
                const data = await productoService.getAll();
                setProductos(data);
            }
            cargarProductos();
        } catch {
            setError("No se pudo cargar los productos")
        } finally{
            setLoading(false);
        }
    }, []);

    return { productos, loading, error} 
}