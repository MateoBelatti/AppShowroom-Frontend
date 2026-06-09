import React from 'react';

export const ConfirmDialog: React.FC<{ msg: string; onConfirm: () => void; onCancel: () => void }> = ({ msg, onConfirm, onCancel }) => (
    <div className="modal-overlay-custom">
        <div className="modal-dialog modal-dialog-centered w-100" style={{ maxWidth: '400px' }}>
            <div className="modal-content text-center shadow">
                <div className="modal-body p-4">
                    <h5 className="mb-4">{msg}</h5>
                    <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-outline-secondary" onClick={onCancel}>Cancelar</button>
                        <button className="btn btn-danger" onClick={onConfirm}>Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);