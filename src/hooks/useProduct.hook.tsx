import { useEffect, useState } from "react"
import { type ProductoCreateDto, type ProductoDto, type ProductoUpdateDto } from "../types/producto.interface"
import { productoService } from "../services/producto.service";

export const useProduct = () => {
    const [ productos, setProductos ] = useState<ProductoDto[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    const deleteProduct =  async (idProducto : number) =>{
        try {
            await productoService.delete(idProducto);
            setProductos(prevProductos => prevProductos.filter(p => p.id !== idProducto));
        } catch (error) {
            throw new Error("No se pudo eliminar el producto");
        }
    }
    const addProduct = async (data : ProductoCreateDto) =>{
        try {
            await productoService.create(data);
            fetchProduct();
        } catch (error) {
            throw new Error("No se pudo crear el producto");
        }
    }
    const updateProduct = async ( data : ProductoUpdateDto) =>{
        try {
            await productoService.update(data);
            fetchProduct();
        } catch (error) {
            throw new Error("No se pudo crear el producto");
        }
    }

    const fetchProduct =  async ( ) =>{
        try{
            const data = await productoService.getAll();
            setProductos(data);
        } catch {
            setError("No se pudo cargar los productos")
        } finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchProduct();
    }, []);

    return { productos, loading, error, deleteProduct, addProduct, updateProduct} 
}