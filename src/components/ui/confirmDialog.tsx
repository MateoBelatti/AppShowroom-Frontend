import React from 'react';
import { AlertCircle } from 'lucide-react';
import './confirmDialog.css';

interface ConfirmDialogProps {
    msg: string;
    title?: string;
    confirmLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    msg,
    title = 'Confirmar eliminación',
    confirmLabel = 'Eliminar',
    onConfirm,
    onCancel,
}) => (
    <div className="modal-overlay-custom" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-dialog modal-dialog-centered w-100" style={{ maxWidth: '420px' }}>
            <div className="modal-content confirm-dialog shadow">
                <div className="confirm-dialog__body">
                    <span className="confirm-dialog__icon"><AlertCircle size={26} strokeWidth={1.8} /></span>
                    <h5 className="confirm-dialog__title">{title}</h5>
                    <p className="confirm-dialog__msg">{msg}</p>
                    <div className="confirm-dialog__actions d-flex justify-content-center gap-2 mt-3">
                        <button type="button" className="btn btn-outline-secondary px-4" onClick={onCancel}>Cancelar</button>
                        <button type="button" className="btn btn-danger px-4" onClick={onConfirm} autoFocus>{confirmLabel}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
