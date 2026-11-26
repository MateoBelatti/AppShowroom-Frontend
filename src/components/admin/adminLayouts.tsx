import React from 'react';
import { useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Tags, Users } from 'lucide-react';
import { Sidebar, type TabType } from './sidebar';
import { DashboardTab } from './dashbordTab';
import { ProductosTab } from './productoTab';
import { CategoriasTab } from './categoriasTab';
import { UsuariosTab } from './usuarioTab';
import { Toast } from '../ui/toast';
import { AdminPageHeader } from '../ui/adminStates';

type Notify = (msg: string, type: 'ok' | 'error') => void;

const vistas: Record<string, { tab: TabType; title: string; description: string; icon: typeof LayoutDashboard }> = {
    '/admin': { tab: 'dashboard', title: 'Resumen general', description: 'Un vistazo rápido a tu tienda.', icon: LayoutDashboard },
    '/admin/productos': { tab: 'productos', title: 'Gestión de productos', description: 'Cargá, editá y organizá tu catálogo.', icon: Package },
    '/admin/categorias': { tab: 'categorias', title: 'Gestión de categorías', description: 'Ordená los productos por categorías.', icon: Tags },
    '/admin/usuarios': { tab: 'usuarios', title: 'Gestión de usuarios', description: 'Consultá y mantené los datos de tus clientes.', icon: Users },
};

export const AdminLayout: React.FC = () => {
    const location = useLocation();
    const ruta = location.pathname.replace(/\/+$/, '') || '/admin';
    const vista = vistas[ruta] ?? vistas['/admin'];
    const [toast, setToast] = React.useState<{ msg: string; type: 'ok' | 'error' } | null>(null);

    const notify: Notify = (msg, type = 'ok') => setToast({ msg, type });

    return (
        <div className="container-fluid admin-layout p-0">
            {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}

            <div className="row g-0 h-100">
                <div className="col-12 col-md-3 col-xl-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-9 col-xl-10 p-3 p-md-4 p-xl-5 admin-content">
                    <AdminPageHeader title={vista.title} description={vista.description} icon={vista.icon} badge="Panel admin" />

                    <div className="fade-in">
                        {vista.tab === 'dashboard' && <DashboardTab />}
                        {vista.tab === 'productos' && <ProductosTab notify={notify} />}
                        {vista.tab === 'categorias' && <CategoriasTab notify={notify} />}
                        {vista.tab === 'usuarios' && <UsuariosTab notify={notify} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
