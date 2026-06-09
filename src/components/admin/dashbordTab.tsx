import React from 'react';

export const DashboardTab: React.FC = () => {
    return (
        <div className="row g-4">
            <div className="col-md-4">
                <div className="card shadow-sm border-0 h-100">
                    <div className="card-body text-center p-4">
                        <h6 className="text-muted text-uppercase mb-2">Pedidos Pendientes</h6>
                        <h2 className="display-5 fw-bold text-primary mb-0">12</h2>
                        <small className="text-muted">Para armar hoy</small>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card shadow-sm border-0 h-100">
                    <div className="card-body text-center p-4">
                        <h6 className="text-muted text-uppercase mb-2">Ventas del Mes</h6>
                        <h2 className="display-5 fw-bold text-success mb-0">$ 450k</h2>
                        <small className="text-muted">+15% vs mes anterior</small>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card shadow-sm border-0 h-100">
                    <div className="card-body text-center p-4">
                        <h6 className="text-muted text-uppercase mb-2">Stock Crítico</h6>
                        <h2 className="display-5 fw-bold text-danger mb-0">3</h2>
                        <small className="text-muted">Productos por agotarse</small>
                    </div>
                </div>
            </div>
        </div>
    );
};