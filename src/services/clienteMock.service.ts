import type { ClienteNivel, ClienteProgresoDto, ClienteResumenDto } from '../types/cliente.interfaces';
import type { UsuarioDto } from '../types/usuario.interfaces';

/** Datos de ejemplo, determinísticos por id: el mismo usuario siempre ve los mismos valores. */
const seedDe = (id: number) => Math.abs((id * 37 + 11) % 97);

const pesos = (valor: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(valor);

const fechaHaceDias = (dias: number) => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - dias);
    return fecha.toISOString();
};

const nivelPara = (compras: number, monto: number): ClienteNivel => {
    if (compras >= 10 || monto >= 150000) return 'VIP';
    if (compras >= 4 || monto >= 60000) return 'Frecuente';
    return 'Nuevo';
};

const progresoPara = (compras: number, nivel: ClienteNivel): ClienteProgresoDto => {
    const requerido = nivel === 'VIP' ? 15 : nivel === 'Frecuente' ? 10 : 5;
    const actual = Math.min(compras, requerido);
    return {
        objetivo: 'Siguiente cupón por compras',
        actual,
        requerido,
        porcentaje: Math.round((actual / requerido) * 100),
        descripcion: actual >= requerido
            ? 'Alcanzó el objetivo: tiene un cupón disponible.'
            : `Faltan ${requerido - actual} compras para el próximo cupón.`,
    };
};

export const clienteMockService = {
    getResumen(usuario: UsuarioDto): ClienteResumenDto {
        const seed = seedDe(usuario.id);
        const compras = 1 + (seed % 14);
        const montoComprado = compras * (9000 + (seed % 6) * 1500);
        const ticketPromedio = Math.round(montoComprado / compras);
        const dias = 3 + (seed % 45);
        const nivel = nivelPara(compras, montoComprado);
        const cuponesGanados = Math.floor(compras / 5);

        return {
            usuarioId: usuario.id,
            nivel,
            compras,
            montoComprado,
            ticketPromedio,
            ultimaCompra: fechaHaceDias(dias),
            diasDesdeUltimaCompra: dias,
            cuponesGanados,
            cuponesDisponibles: cuponesGanados > 0 ? 1 : 0,
            progreso: progresoPara(compras, nivel),
            notas: `Cliente ${nivel.toLowerCase()}. Perfil útil para cupones por cantidad de compras y monto acumulado (${pesos(montoComprado)}).`,
        };
    },
};
