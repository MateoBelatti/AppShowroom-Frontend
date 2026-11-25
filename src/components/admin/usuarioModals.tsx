import React, { useState } from 'react';
import { BadgePercent, CalendarDays, Mail, MapPin, Pencil, Phone, ShieldCheck, UserRound } from 'lucide-react';
import { z } from 'zod';
import type { ClienteResumenDto } from '../../types/cliente.interfaces';
import type { UsuarioDto, UsuarioUpdateDto } from '../../types/usuario.interfaces';
import './usuarioModals.css';

const formatearFecha = (valor?: string | Date | null) => {
    if (!valor) return 'Sin registro';
    const fecha = valor instanceof Date ? valor : new Date(valor);
    if (Number.isNaN(fecha.getTime())) return 'Sin registro';
    return new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium' }).format(fecha);
};

const pesos = (valor: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(valor);

interface UsuarioDetalleModalProps {
    usuario: UsuarioDto;
    resumen: ClienteResumenDto | null;
    onEdit: () => void;
    onClose: () => void;
}

export const UsuarioDetalleModal: React.FC<UsuarioDetalleModalProps> = ({ usuario, resumen, onEdit, onClose }) => (
    <div className="admin-modal-overlay" role="dialog" aria-modal="true" aria-label={`Detalle de ${usuario.nombre}`}>
        <div className="admin-modal admin-modal--wide">
            <div className="admin-modal__header">
                <div className="d-flex align-items-center gap-3">
                    <span className="admin-modal__avatar">{usuario.nombre.charAt(0).toUpperCase()}</span>
                    <div>
                        <h5 className="admin-modal__title mb-0">{usuario.nombre}</h5>
                        <span className="admin-modal__subtitle">{usuario.email}</span>
                    </div>
                </div>
                <button type="button" className="btn-close" onClick={onClose} aria-label="Cerrar" />
            </div>

            <div className="admin-modal__body">
                <div className="d-flex flex-wrap gap-2 mb-4">
                    <span className={`admin-chip ${usuario.rol === 'Admin' ? 'admin-chip--dark' : ''}`}>
                        <ShieldCheck size={14} /> {usuario.rol}
                    </span>
                    {resumen && <span className="admin-chip"><BadgePercent size={14} /> Nivel {resumen.nivel}</span>}
                    <span className="admin-chip admin-chip--mock">Datos de ejemplo</span>
                </div>

                <h6 className="admin-section-title">Datos de contacto</h6>
                <div className="admin-detail-grid">
                    <div className="admin-detail-item"><Mail size={16} /><div><span>Email</span><strong>{usuario.email}</strong></div></div>
                    <div className="admin-detail-item"><MapPin size={16} /><div><span>Dirección</span><strong>{usuario.direccion || 'Sin dirección'}</strong></div></div>
                    <div className="admin-detail-item"><Phone size={16} /><div><span>Teléfono</span><strong>{usuario.telefono || 'Sin teléfono'}</strong></div></div>
                    <div className="admin-detail-item"><CalendarDays size={16} /><div><span>Última conexión</span><strong>{formatearFecha(usuario.ultimaConeccion)}</strong></div></div>
                </div>

                {resumen && (
                    <>
                        <h6 className="admin-section-title mt-4">Actividad del cliente <span className="text-secondary fw-normal">(para cupones)</span></h6>
                        <div className="admin-metrics-grid">
                            <div className="admin-metric"><span>Compras realizadas</span><strong>{resumen.compras}</strong></div>
                            <div className="admin-metric"><span>Monto acumulado</span><strong>{pesos(resumen.montoComprado)}</strong></div>
                            <div className="admin-metric"><span>Ticket promedio</span><strong>{pesos(resumen.ticketPromedio)}</strong></div>
                            <div className="admin-metric"><span>Última compra</span><strong>{formatearFecha(resumen.ultimaCompra)}</strong></div>
                            <div className="admin-metric"><span>Cupones ganados</span><strong>{resumen.cuponesGanados}</strong></div>
                            <div className="admin-metric"><span>Cupones disponibles</span><strong>{resumen.cuponesDisponibles}</strong></div>
                        </div>

                        <div className="admin-progress-box">
                            <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap">
                                <strong className="small">{resumen.progreso.objetivo}</strong>
                                <span className="small text-secondary">{resumen.progreso.actual} / {resumen.progreso.requerido}</span>
                            </div>
                            <div className="progress admin-progress mt-2" role="progressbar" aria-valuenow={resumen.progreso.porcentaje} aria-valuemin={0} aria-valuemax={100}>
                                <div className="progress-bar" style={{ width: `${resumen.progreso.porcentaje}%` }} />
                            </div>
                            <p className="small text-secondary mt-2 mb-0">{resumen.progreso.descripcion}</p>
                        </div>

                        <p className="admin-mock-note mb-0"><BadgePercent size={15} /> {resumen.notas}</p>
                    </>
                )}
            </div>

            <div className="admin-modal__footer">
                <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cerrar</button>
                <button type="button" className="btn admin-btn-primary" onClick={onEdit}><Pencil size={16} /> Editar datos</button>
            </div>
        </div>
    </div>
);

const esquema = z.object({
    nombre: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres.'),
    email: z.string().trim().refine(v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Ingresá un email válido.'),
    direccion: z.string().trim().optional(),
    telefono: z.string().trim().optional(),
});

interface UsuarioEditModalProps {
    usuario: UsuarioDto;
    onSave: (data: UsuarioUpdateDto) => Promise<void>;
    onClose: () => void;
}

export const UsuarioEditModal: React.FC<UsuarioEditModalProps> = ({ usuario, onSave, onClose }) => {
    const [form, setForm] = useState({
        nombre: usuario.nombre,
        email: usuario.email,
        direccion: usuario.direccion ?? '',
        telefono: usuario.telefono ?? '',
    });
    const [errores, setErrores] = useState<Record<string, string>>({});
    const [guardando, setGuardando] = useState(false);
    const [errorGeneral, setErrorGeneral] = useState<string | null>(null);

    const cambiar = (campo: keyof typeof form, valor: string) => {
        setForm(prev => ({ ...prev, [campo]: valor }));
        setErrores(prev => ({ ...prev, [campo]: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorGeneral(null);
        const resultado = esquema.safeParse(form);
        if (!resultado.success) {
            const nuevos: Record<string, string> = {};
            resultado.error.issues.forEach(issue => {
                const campo = String(issue.path[0] ?? '');
                if (campo) nuevos[campo] = issue.message;
            });
            setErrores(nuevos);
            return;
        }
        setGuardando(true);
        try {
            await onSave(resultado.data);
        } catch (err) {
            setErrorGeneral(err instanceof Error ? err.message : 'No se pudo guardar el usuario.');
            setGuardando(false);
        }
    };

    return (
        <div className="admin-modal-overlay" role="dialog" aria-modal="true" aria-label={`Editar ${usuario.nombre}`}>
            <div className="admin-modal">
                <div className="admin-modal__header">
                    <div className="d-flex align-items-center gap-2">
                        <UserRound size={19} />
                        <h5 className="admin-modal__title mb-0">Editar usuario</h5>
                    </div>
                    <button type="button" className="btn-close" onClick={onClose} aria-label="Cerrar" disabled={guardando} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="admin-modal__body">
                        <div className="mb-3">
                            <label className="form-label small fw-semibold" htmlFor="edit-nombre">Nombre</label>
                            <input id="edit-nombre" className={`form-control ${errores.nombre ? 'is-invalid' : ''}`} aria-invalid={!!errores.nombre} value={form.nombre} onChange={e => cambiar('nombre', e.target.value)} />
                            {errores.nombre && <div className="invalid-feedback d-block">{errores.nombre}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold" htmlFor="edit-email">Email</label>
                            <input id="edit-email" type="email" className={`form-control ${errores.email ? 'is-invalid' : ''}`} aria-invalid={!!errores.email} value={form.email} onChange={e => cambiar('email', e.target.value)} />
                            {errores.email && <div className="invalid-feedback d-block">{errores.email}</div>}
                        </div>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label small fw-semibold" htmlFor="edit-direccion">Dirección</label>
                                <input id="edit-direccion" className="form-control" value={form.direccion} onChange={e => cambiar('direccion', e.target.value)} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-semibold" htmlFor="edit-telefono">Teléfono</label>
                                <input id="edit-telefono" className="form-control" value={form.telefono} onChange={e => cambiar('telefono', e.target.value)} />
                            </div>
                        </div>
                        <div className="mt-3">
                            <label className="form-label small fw-semibold mb-1">Rol</label>
                            <div><span className={`admin-chip ${usuario.rol === 'Admin' ? 'admin-chip--dark' : ''}`}><ShieldCheck size={14} /> {usuario.rol} (solo lectura)</span></div>
                        </div>
                        {errorGeneral && <div className="alert alert-danger py-2 small mt-3 mb-0" role="alert">{errorGeneral}</div>}
                    </div>
                    <div className="admin-modal__footer">
                        <button type="button" className="btn btn-outline-secondary" onClick={onClose} disabled={guardando}>Cancelar</button>
                        <button type="submit" className="btn admin-btn-primary" disabled={guardando}>
                            {guardando ? <><span className="admin-spinner" /> Guardando...</> : 'Guardar cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
