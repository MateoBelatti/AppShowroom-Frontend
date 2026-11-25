import { useContext } from "react";
import { CarritoContext } from "../context/carritoContext";

export const  useCarrito = () =>{
    const context = useContext(CarritoContext);
    if (!context){
        throw new Error("No se pudo utilizar el context del carrito");
    }
    return context;
}