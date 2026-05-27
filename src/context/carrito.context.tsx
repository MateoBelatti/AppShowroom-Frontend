import { createContext, useState, useEffect, type ReactNode, useCallback } from "react";
import type { CarritoDto, ICarritoContext } from "../types/carrito.interfaces";
import type { DetalleCarritoCreateDto, DetalleCarritoDto, DetalleCarritoUpdateDto } from "../types/detalleCarrito.interfaces";
import { useAuth } from "../hooks/useAuth.hook";
import { carritoService } from "../services/carrito.service";
import { detalleCarritoService } from "../services/detalleCarrito.service";
import axios from "axios";

export const CarritoContext = createContext<ICarritoContext | null>(null);

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
    const [ carrito, setCarrito ] = useState<CarritoDto | null>(null);
    const [ detalles, setDetalles ] = useState<DetalleCarritoDto[]>([]);
    const auth = useAuth();

    const updateDetalle =  async (detalle : DetalleCarritoUpdateDto) =>{
        try {
            await detalleCarritoService.update(detalle);
            refreshDetalles();
        } catch (error) {
            console.log("Error al editar detalles del carrito", error);
        }
    }
    const refreshDetalles = useCallback(async (idFuerza?: number) => {
        const idAUsar = idFuerza || carrito?.id;
        if (!idAUsar) return;
        
        try {
            const newDetalles = await detalleCarritoService.findAllByIdCarrito(idAUsar);
            setDetalles(newDetalles);
        } catch (error) {
            console.log("Error al refrescar detalles del carrito", error);
        }
    }, [carrito?.id]);

    useEffect(() =>{
        const cargarUser = async() =>{
            if (!auth?.user?.id) {
                setCarrito(null);
                setDetalles([]);
                return;
            };
            try {
                const newCarrito = await carritoService.findByIdUsuario(Number(auth.user.id));
                setCarrito(newCarrito);

                const newDetalles = await detalleCarritoService.findAllByIdCarrito(newCarrito.id)
                setDetalles(newDetalles);

            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    console.log("El usuario aún no tiene carrito. Se creará al agregar un producto.");
                } else {
                    console.error("Ocurrió un error inesperado al buscar el carrito:", error);
                }
            }
        }
        cargarUser();
    }, [auth]);

    const addDetalle = async (detalle : DetalleCarritoCreateDto) : Promise<void> =>{
        let carritoIdActual = carrito?.id;
        if (!carritoIdActual) {
            if (!auth.user?.id) throw new Error("Usuario no logeado");
            
            const newCarrito = await carritoService.create({UsuarioId : Number(auth.user?.id)})
            setCarrito(newCarrito);
            carritoIdActual = newCarrito.id;
        }
        const productoCargado = carrito?.detalles.find( det => det.productoId == detalle.productoId);
        try {
            if (productoCargado) throw new Error("El producto ya esta en el carrito");
            detalle.carritoId = carritoIdActual;
            await detalleCarritoService.create(detalle);
            await refreshDetalles();
        } catch (error) {
            console.log("No se pudo crear el detalle del carritoo", error);
            
        }
        
    }
    const removeDetalle = async (idDetalle : number) : Promise<void> => {
        try {
            await detalleCarritoService.delete(idDetalle);
            await refreshDetalles();
        } catch (error) {
                console.log("No se pudo eliminar el detalle de carrito");
        }
    }
    return (
        <CarritoContext.Provider value={{carrito, detalles, addDetalle, removeDetalle, refreshDetalles, updateDetalle}}>
            {children}
        </CarritoContext.Provider>
    )
}