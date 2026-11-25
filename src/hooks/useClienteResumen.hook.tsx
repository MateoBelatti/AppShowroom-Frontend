import { useMemo } from 'react';
import { clienteMockService } from '../services/clienteMock.service';
import type { UsuarioDto } from '../types/usuario.interfaces';

/** Expone el resumen mockeado del cliente; cuando exista el endpoint, cambia solo el service. */
export const useClienteResumen = (usuario: UsuarioDto | null) =>
    useMemo(() => (usuario ? clienteMockService.getResumen(usuario) : null), [usuario]);
