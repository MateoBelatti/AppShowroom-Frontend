import { createContext } from 'react';
import type { ICarritoContext } from '../types/carrito.interfaces';

export const CarritoContext = createContext<ICarritoContext | null>(null);
