/**
 * Resumen de actividad del cliente pensado para el futuro módulo de cupones.
 * Hoy lo entrega un mock; la forma del DTO ya está preparada para reemplazarse
 * por un endpoint real sin cambiar los componentes.
 */
export type ClienteNivel = 'Nuevo' | 'Frecuente' | 'VIP';

export interface ClienteProgresoDto {
    objetivo: string;
    actual: number;
    requerido: number;
    porcentaje: number;
    descripcion: string;
}

export interface ClienteResumenDto {
    usuarioId: number;
    nivel: ClienteNivel;
    compras: number;
    montoComprado: number;
    ticketPromedio: number;
    ultimaCompra: string | null;
    diasDesdeUltimaCompra: number | null;
    cuponesGanados: number;
    cuponesDisponibles: number;
    progreso: ClienteProgresoDto;
    notas: string;
}
