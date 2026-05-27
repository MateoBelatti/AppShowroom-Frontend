import React, { useState } from 'react';

export const UsuariosTab: React.FC<{ notify: (msg: string, type: 'ok'|'error') => void }> = ({ notify }) => {
    const [search, setSearch] = useState('');
    // Mock de datos
    const [usuarios] = useState([{ id: 1, nombre: 'Mateo', email: 'mateo@mail.com', rol: 'ADMIN' }]);

    return (
        <div>
            <div className="mb-4">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Buscar por nombre o email..." 
                    style={{ maxWidth: '400px' }}
                    value={search} onChange={e => setSearch(e.target.value)} 
                />
            </div>

            <div className="card shadow-sm border-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light text-uppercase" style={{ fontSize: '0.85rem' }}>
                            <tr>
                                <th className="ps-4">Usuario</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th className="pe-4 text-end">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map(u => (
                                <tr key={u.id}>
                                    <td className="ps-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '35px', height: '35px' }}>
                                                {u.nombre.charAt(0)}
                                            </div>
                                            <span className="fw-bold">{u.nombre}</span>
                                        </div>
                                    </td>
                                    <td>{u.email}</td>
                                    <td>
                                        <span className={`badge ${u.rol === 'ADMIN' ? 'bg-dark' : 'bg-secondary'}`}>
                                            {u.rol}
                                        </span>
                                    </td>
                                    <td className="pe-4 text-end">
                                        <button className="btn btn-sm btn-outline-info me-2">👁️</button>
                                        <button className="btn btn-sm btn-outline-danger">🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};