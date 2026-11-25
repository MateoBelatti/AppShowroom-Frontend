import React, { useState } from 'react';
import { Eye, Pencil, Trash2, Users } from 'lucide-react';
import { useUsuarios } from '../../hooks/useUsuario.hook';
import { useClienteResumen } from '../../hooks/useClienteResumen.hook';
import { clienteMockService } from '../../services/clienteMock.service';
import type { UsuarioDto, UsuarioUpdateDto } from '../../types/usuario.interfaces';
import { ConfirmDialog } from '../ui/confirmDialog';
import { AdminEmpty, AdminError, AdminLoading, AdminToolbar } from '../ui/adminStates';
import { UsuarioDetalleModal, UsuarioEditModal } from './usuarioModals';

type Notify = (msg: string, type: 'ok' | 'error') => void;

export const UsuariosTab: React.FC<{ notify: Notify }> = ({ notify }) => {
    const [search, setSearch] = useState('');
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<UsuarioDto | null>(null);
    const [editando, setEditando] = useState(false);
    const [usuarioAEliminar, setUsuarioAEliminar] = useState<UsuarioDto | null>(null);
    const { usuarios, loadingUsuarios, errorUsuarios, cargarUsuarios, updateUsuario, deleteUsuario } = useUsuarios();
    const resumen = useClienteResumen(usuarioSeleccionado);

    const filtrados = usuarios.filter(u => {
        const texto = `${u.nombre} ${u.email}`.toLowerCase();
        return texto.includes(search.trim().toLowerCase());
    });

    const handleSave = async (data: UsuarioUpdateDto) => {
        if (!usuarioSeleccionado) return;
        await updateUsuario(usuarioSeleccionado.id, data);
        notify('Los datos del usuario fueron actualizados.', 'ok');
        setEditando(false);
        setUsuarioSeleccionado(null);
    };

    const handleDelete = async () => {
        if (!usuarioAEliminar) return;
        try {
            await deleteUsuario(usuarioAEliminar.id);
            notify(`Se eliminó a "${usuarioAEliminar.nombre}".`, 'ok');
        } catch {
            notify('No se pudo eliminar el usuario.', 'error');
        } finally {
            setUsuarioAEliminar(null);
        }
    };

    return (
        <div className="fade-in">
            <AdminToolbar search={search} onSearch={setSearch} placeholder="Buscar por nombre o email..." />

            {loadingUsuarios && <AdminLoading rows={6} label="Cargando usuarios..." />}
            {!loadingUsuarios && errorUsuarios && <AdminError message={errorUsuarios} onRetry={cargarUsuarios} />}
            {!loadingUsuarios && !errorUsuarios && filtrados.length === 0 && (
                <AdminEmpty
                    icon={Users}
                    title={usuarios.length === 0 ? 'Todavía no hay usuarios' : 'Sin resultados'}
                    description={usuarios.length === 0
                        ? 'Cuando se registren clientes aparecerán acá.'
                        : `No encontramos usuarios para "${search}".`}
                />
            )}
            {!loadingUsuarios && !errorUsuarios && filtrados.length > 0 && (
                <div className="admin-card">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle admin-table mb-0">
                            <thead>
                                <tr>
                                    <th className="ps-4">Usuario</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Nivel <small className="text-secondary fw-normal">(ejemplo)</small></th>
                                    <th>Acciones</th>
                                    <th className="pe-4 text-end"> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtrados.map(u => {
                                    const cliente = clienteMockService.getResumen(u);
                                    return (
                                        <tr key={u.id}>
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center gap-3">
                                                    <span className="admin-avatar">{u.nombre.charAt(0).toUpperCase()}</span>
                                                    <span className="fw-semibold">{u.nombre}</span>
                                                </div>
                                            </td>
                                            <td className="text-secondary">{u.email}</td>
                                            <td>
                                                <span className={`badge ${u.rol === 'Admin' ? 'bg-dark' : 'bg-secondary-subtle text-secondary-emphasis'}`}>
                                                    {u.rol}
                                                </span>
                                            </td>
                                            <td><span className="admin-tag">{cliente?.nivel ?? '—'}</span></td>
                                            <td>
                                                <div className="admin-actions">
                                                    <button type="button" className="admin-action" onClick={() => setUsuarioSeleccionado(u)} aria-label={`Ver detalle de ${u.nombre}`} title="Ver detalle">
                                                        <Eye size={15} />
                                                    </button>
                                                    <button type="button" className="admin-action admin-action--edit" onClick={() => { setUsuarioSeleccionado(u); setEditando(true); }} aria-label={`Editar ${u.nombre}`} title="Editar">
                                                        <Pencil size={15} />
                                                    </button>
                                                    <button type="button" className="admin-action admin-action--delete" onClick={() => setUsuarioAEliminar(u)} aria-label={`Eliminar ${u.nombre}`} title="Eliminar">
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="pe-4 text-end"><small className="text-secondary">#{u.id}</small></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="admin-card__footer">Mostrando {filtrados.length} de {usuarios.length} usuarios</div>
                </div>
            )}

            {usuarioSeleccionado && !editando && (
                <UsuarioDetalleModal
                    usuario={usuarioSeleccionado}
                    resumen={resumen}
                    onEdit={() => setEditando(true)}
                    onClose={() => setUsuarioSeleccionado(null)}
                />
            )}
            {usuarioSeleccionado && editando && (
                <UsuarioEditModal
                    usuario={usuarioSeleccionado}
                    onSave={handleSave}
                    onClose={() => { setEditando(false); setUsuarioSeleccionado(null); }}
                />
            )}
            {usuarioAEliminar && (
                <ConfirmDialog
                    title="Eliminar usuario"
                    msg={`¿Eliminar a "${usuarioAEliminar.nombre}"? Esta acción no se puede deshacer.`}
                    onConfirm={handleDelete}
                    onCancel={() => setUsuarioAEliminar(null)}
                />
            )}
        </div>
    );
};
