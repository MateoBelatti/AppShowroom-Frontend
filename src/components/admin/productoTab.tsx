import React, { useState } from 'react';

export const ProductosTab: React.FC<{ notify: (msg: string, type: 'ok'|'error') => void }> = ({ notify }) => {
    const [search, setSearch] = useState('');
    // Mock de datos
    const [productos] = useState([{ id: 1, nombre: 'Vela de Soja', precio: 1500, stock: 20, activo: true, categorias: ['Aromas'] }]);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4 gap-3 flex-wrap">
                <input 
                    type="text" 
                    className="form-control w-auto flex-grow-1" 
                    placeholder="Buscar productos..." 
                    style={{ maxWidth: '400px' }}
                    value={search} onChange={e => setSearch(e.target.value)} 
                />
                <button className="btn btn-primary">+ Nuevo Producto</button>
            </div>

            <div className="card shadow-sm border-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light text-uppercase" style={{ fontSize: '0.85rem' }}>
                            <tr>
                                <th className="ps-4">Nombre</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Estado</th>
                                <th className="pe-4 text-end">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(p => (
                                <tr key={p.id}>
                                    <td className="ps-4 fw-bold">{p.nombre}</td>
                                    <td>${p.precio.toLocaleString()}</td>
                                    <td>{p.stock}</td>
                                    <td>
                                        <span className={`badge ${p.activo ? 'bg-success' : 'bg-danger'}`}>
                                            {p.activo ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="pe-4 text-end">
                                        <button className="btn btn-sm btn-outline-secondary me-2">✏️</button>
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