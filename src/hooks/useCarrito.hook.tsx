import { useContext } from "react";
import { CarritoContext } from "../context/carrito.context";

export const  useCarrito = () =>{
    const context = useContext(CarritoContext);
    if (!context){
        throw new Error("No se pudo utilizar el context del carrito");
    }
    return context;
}