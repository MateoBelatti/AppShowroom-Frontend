import React, { useState } from 'react';
import { Sidebar } from './sidebar';
import { DashboardTab } from './dashbordTab';
import { ProductosTab } from './productoTab';
import { CategoriasTab } from './categoriasTab';
import { UsuariosTab } from './usuarioTab';
import { Toast } from '../ui/toast';

type TabType = 'dashboard' | 'productos' | 'categorias' | 'usuarios';

export const AdminLayout: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('dashboard');
    const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'error' } | null>(null);

    const notify = (msg: string, type: 'ok' | 'error' = 'ok') => setToast({ msg, type });

    return (
        <div className="container-fluid admin-layout p-0">
            {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
            
            <div className="row g-0 h-100">
                <div className="col-12 col-md-3 col-xl-2">
                    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
                
                <div className="col-12 col-md-9 col-xl-10 p-4 p-md-5">
                    <header className="mb-4">
                        <h2 className="fw-bold text-dark">
                            {activeTab === 'dashboard' && 'Resumen General'}
                            {activeTab === 'productos' && 'Gestión de Productos'}
                            {activeTab === 'categorias' && 'Gestión de Categorías'}
                            {activeTab === 'usuarios' && 'Gestión de Usuarios'}
                        </h2>
                        <p className="text-muted">Administrá tu información de forma rápida y sencilla.</p>
                    </header>

                    <main>
                        {activeTab === 'dashboard' && <DashboardTab />}
                        {activeTab === 'productos' && <ProductosTab notify={notify} />}
                        {activeTab === 'categorias' && <CategoriasTab notify={notify} />}
                        {activeTab === 'usuarios' && <UsuariosTab notify={notify} />}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;