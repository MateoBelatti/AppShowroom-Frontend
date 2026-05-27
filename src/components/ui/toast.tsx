import React, { useEffect } from 'react';
import "./toast.css"

export const Toast: React.FC<{ msg: string; type: 'ok' | 'error'; onDone: () => void }> = ({ msg, type, onDone }) => {
    useEffect(() => {
        const t = setTimeout(onDone, 3000);
        return () => clearTimeout(t);
    }, [onDone]);

    const bgColor = type === 'ok' ? 'bg-success' : 'bg-danger';

    return (
        <div className="toast-container-custom">
            <div className={`toast show align-items-center text-white border-0 ${bgColor}`} role="alert">
                <div className="d-flex">
                    <div className="toast-body fw-bold">
                        {msg}
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={onDone} aria-label="Close"></button>
                </div>
            </div>
        </div>
    );
};