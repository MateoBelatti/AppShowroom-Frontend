import React from 'react';
import "./sideBar.css"

type TabType = 'dashboard' | 'productos' | 'categorias' | 'usuarios';

export const Sidebar: React.FC<{ activeTab: TabType; setActiveTab: (tab: TabType) => void }> = ({ activeTab, setActiveTab }) => {
    return (
        <aside className="d-flex flex-column flex-shrink-0 p-3 bg-white sidebar-sticky">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <span className="fs-4 fw-bold px-2">Admin Panel</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto gap-1">
                <li className="nav-item">
                    <button className={`nav-link w-100 text-start ${activeTab === 'dashboard' ? 'active' : 'link-dark'}`} onClick={() => setActiveTab('dashboard')}>
                        Dashboard
                    </button>
                </li>
                <li>
                    <button className={`nav-link w-100 text-start ${activeTab === 'productos' ? 'active' : 'link-dark'}`} onClick={() => setActiveTab('productos')}>
                        Productos
                    </button>
                </li>
                <li>
                    <button className={`nav-link w-100 text-start ${activeTab === 'categorias' ? 'active' : 'link-dark'}`} onClick={() => setActiveTab('categorias')}>
                        Categorías
                    </button>
                </li>
                <li>
                    <button className={`nav-link w-100 text-start ${activeTab === 'usuarios' ? 'active' : 'link-dark'}`} onClick={() => setActiveTab('usuarios')}>
                        Usuarios
                    </button>
                </li>
            </ul>
        </aside>
    );
};