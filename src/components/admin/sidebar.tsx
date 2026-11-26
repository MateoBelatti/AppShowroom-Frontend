import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, LayoutDashboard, Package, Tags, Users } from 'lucide-react';
import "./sideBar.css";

export type TabType = 'dashboard' | 'productos' | 'categorias' | 'usuarios';

const items: { to: string; label: string; icon: typeof LayoutDashboard; tab: TabType }[] = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, tab: 'dashboard' },
    { to: '/admin/productos', label: 'Productos', icon: Package, tab: 'productos' },
    { to: '/admin/categorias', label: 'Categorías', icon: Tags, tab: 'categorias' },
    { to: '/admin/usuarios', label: 'Usuarios', icon: Users, tab: 'usuarios' },
];

export const Sidebar: React.FC = () => {
    return (
        <aside className="d-flex flex-column flex-shrink-0 p-3 bg-white sidebar-sticky">
            <NavLink to="/" className="sidebar-brand">
                <span className="sidebar-brand__mark">C</span>
                <span className="sidebar-brand__text">
                    <strong>Admin Panel</strong>
                    <small>Canela Artesanías</small>
                </span>
            </NavLink>
            <hr />
            <nav className="sidebar-nav">
                <ul className="nav nav-pills mb-auto gap-1">
                    {items.map(({ to, label, icon: Icon, tab }) => (
                        <li className="nav-item" key={tab}>
                            <NavLink
                                to={to}
                                end={to === '/admin'}
                                className={({ isActive }) => `nav-link sidebar-link ${isActive ? 'active' : 'link-dark'}`}
                            >
                                <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
                                <span>{label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <NavLink to="/" className="sidebar-back" aria-label="Volver a la tienda">
                <ArrowLeft size={16} aria-hidden="true" /> <span className="sidebar-back__text">Volver a la tienda</span>
            </NavLink>
        </aside>
    );
};
