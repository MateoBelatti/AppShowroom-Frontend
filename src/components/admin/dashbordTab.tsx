import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Clock3, PackageX, ShoppingBag, TrendingUp } from 'lucide-react';
import { useProduct } from '../../hooks/useProduct.hook';
import { AdminEmpty, AdminError } from '../ui/adminStates';
import './dashbordTab.css';

export const DashboardTab: React.FC = () => {
    const { productos, loading, error, fetchProduct } = useProduct();
    const criticos = productos.filter(p => p.activo && p.stock <= 5);

    const stockValue = error ? '—' : loading ? '…' : String(criticos.length);

    return (
        <div className="fade-in">
            <div className="dash-grid">
                <div className="dash-kpi">
                    <div className="dash-kpi__top">
                        <p className="dash-kpi__label">Stock crítico</p>
                        <span className="dash-kpi__icon dash-kpi__icon--warning"><PackageX size={19} /></span>
                    </div>
                    <div>
                        <div className="dash-kpi__value">{stockValue}</div>
                        <p className="dash-kpi__hint">Productos activos con 5 unidades o menos</p>
                    </div>
                </div>

                <div className="dash-kpi dash-kpi--soon">
                    <div className="dash-kpi__top">
                        <p className="dash-kpi__label">Ventas del mes</p>
                        <span className="dash-kpi__icon"><TrendingUp size={19} /></span>
                    </div>
                    <div>
                        <div className="dash-kpi__value">—</div>
                        <span className="dash-kpi__soon"><Clock3 size={13} /> Próximamente</span>
                    </div>
                </div>

                <div className="dash-kpi dash-kpi--soon">
                    <div className="dash-kpi__top">
                        <p className="dash-kpi__label">Pedidos pendientes</p>
                        <span className="dash-kpi__icon"><ShoppingBag size={19} /></span>
                    </div>
                    <div>
                        <div className="dash-kpi__value">—</div>
                        <span className="dash-kpi__soon"><Clock3 size={13} /> Próximamente</span>
                    </div>
                </div>

                <div className="dash-kpi dash-kpi--soon">
                    <div className="dash-kpi__top">
                        <p className="dash-kpi__label">Ticket promedio</p>
                        <span className="dash-kpi__icon"><BarChart3 size={19} /></span>
                    </div>
                    <div>
                        <div className="dash-kpi__value">—</div>
                        <span className="dash-kpi__soon"><Clock3 size={13} /> Próximamente</span>
                    </div>
                </div>
            </div>

            {error && <div className="mb-4"><AdminError message={error} onRetry={fetchProduct} /></div>}

            {!error && !loading && criticos.length > 0 && (
                <div className="admin-card dash-critical">
                    <div className="admin-card__body">
                        <h5 className="admin-card-title mb-1">Productos para reponer</h5>
                        <p className="text-secondary small mb-0">Éstos son los datos reales que ya podemos mostrar.</p>
                        <div className="dash-critical__list">
                            {criticos.map(p => (
                                <div className="dash-critical__item" key={p.id}>
                                    <span className="text-truncate">{p.nombre}</span>
                                    <span className="dash-critical__stock">{p.stock} uds.</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3">
                            <Link to="/admin/productos" className="btn btn-outline-secondary btn-sm">
                                Ver productos <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {!error && !loading && criticos.length === 0 && (
                <div className="mb-4">
                    <AdminEmpty
                        title="Sin productos por agotarse"
                        description="Todos los productos activos tienen stock suficiente."
                    />
                </div>
            )}

            <div className="dash-panel">
                <span className="dash-panel__icon"><BarChart3 size={26} /></span>
                <h5 className="dash-panel__title">Gráficos y métricas: próximamente</h5>
                <p className="dash-panel__text">
                    Estas secciones necesitan el registro de pedidos. Se conectan acá mismo en cuanto el backend las exponga,
                    sin cambiar el diseño del panel.
                </p>
                <div className="dash-panel__list">
                    <span className="dash-panel__chip">Ventas de los últimos 6 meses</span>
                    <span className="dash-panel__chip">Evolución de pedidos</span>
                    <span className="dash-panel__chip">Top 5 productos</span>
                    <span className="dash-panel__chip">Ventas por categoría</span>
                </div>
            </div>
        </div>
    );
};
