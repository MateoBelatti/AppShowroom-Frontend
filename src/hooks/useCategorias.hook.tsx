import { useEffect, useState } from "react"
import { type CategoriaDto } from "../types/categoria.interfaces"
import { categoriaService } from "../services/categoria.service";

export const useCategorias = () => {
    const [ categorias, setCategorias ] = useState<CategoriaDto[]>([]);
    const [ loadingCat, setLoading ] = useState<boolean>(true);
    const [ errorCat, setErrorCat ] = useState<string | null>(null);

    useEffect(()=> {
        try{
            const cargar = async () => {
                const categorias = await categoriaService.getAll();
                setCategorias(categorias);
            }
            cargar();
        } catch {
            setErrorCat("No se pudieron cargar las categorias");
        } finally {
            setLoading(false);
        }
    })
    return { categorias, loadingCat, errorCat};
}