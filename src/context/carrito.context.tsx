import { createContext, useState, useEffect, type ReactNode } from "react";
import type { CarritoDto, ICarritoContext } from "../types/carrito.interfaces";
import type { DetalleCarritoCreateDto, DetalleCarritoDto } from "../types/detalleCarrito.interfaces";
import { useAuth } from "../hooks/useAuth.hook";
import { carritoService } from "../services/carrito.service";
import { detalleCarritoService } from "../services/detalleCarrito.service";

export const CarritoContext = createContext<ICarritoContext | null>(null);

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
    const [ carrito, setCarrito ] = useState<CarritoDto | null>(null);
    const [ detalles, setDetalles ] = useState<DetalleCarritoDto[]>([]);
    const auth = useAuth();

    useEffect(() =>{
        try {
            const cargarUser = async() =>{
            if (!auth.user) return;
            const userId = Number(auth.user.id);
            const newCarrito = await carritoService.findByIdUsuario(userId);
            if (!newCarrito) throw new Error("No se encontro carrito para el usuario");
            setCarrito(newCarrito);
            const newDetalles = await detalleCarritoService.findAllByIdCarrito(newCarrito.Id)
            setDetalles(newDetalles);
        }
        cargarUser();
        } catch (error) {
            console.log("error en el useEffect de carritoContext");
            
        }
    }, [auth]);

    const addDetalle = async (detalle : DetalleCarritoCreateDto) : Promise<void> =>{
        try {
            detalle.CarritoId = Number(carrito?.Id)
            await detalleCarritoService.create(detalle);
        } catch (error) {
            console.log("No se pudo crear el detalle del carritoo");
            
        }
        
    }
    const removeDetalle = async (idDetalle : number) : Promise<void> => {
        try {
            await detalleCarritoService.delete(idDetalle);
        } catch (error) {
                console.log("No se pudo eliminar el detalle de carrito");
        }
    }
    return (
        <CarritoContext.Provider value={{carrito, detalles, addDetalle, removeDetalle}}>
            {children}
        </CarritoContext.Provider>
    )
}