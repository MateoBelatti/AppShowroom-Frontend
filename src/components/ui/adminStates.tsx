import React from 'react';
import { AlertCircle, Inbox, Plus, Search, type LucideIcon } from 'lucide-react';
import './adminStates.css';

interface AdminPageHeaderProps {
    title: string;
    description: string;
    icon: LucideIcon;
    badge?: string;
}

export const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({ title, description, icon: Icon, badge }) => (
    <header className="admin-page-header">
        <div className="d-flex align-items-center gap-3">
            <span className="admin-page-header__icon"><Icon size={22} strokeWidth={1.9} /></span>
            <div>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                    <h2 className="admin-page-header__title mb-0">{title}</h2>
                    {badge && <span className="admin-page-header__badge">{badge}</span>}
                </div>
                <p className="admin-page-header__description mb-0">{description}</p>
            </div>
        </div>
    </header>
);

interface AdminToolbarProps {
    search: string;
    onSearch: (value: string) => void;
    placeholder: string;
    actionLabel?: string;
    onAction?: () => void;
    actionIcon?: LucideIcon;
}

export const AdminToolbar: React.FC<AdminToolbarProps> = ({
    search,
    onSearch,
    placeholder,
    actionLabel,
    onAction,
    actionIcon: ActionIcon = Plus,
}) => (
    <div className="admin-toolbar">
        <div className="admin-toolbar__search">
            <Search size={17} aria-hidden="true" />
            <input
                type="search"
                className="admin-toolbar__input"
                placeholder={placeholder}
                aria-label={placeholder}
                value={search}
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
        {actionLabel && onAction && (
            <button type="button" className="btn admin-btn-primary" onClick={onAction}>
                <ActionIcon size={17} aria-hidden="true" />
                <span>{actionLabel}</span>
            </button>
        )}
    </div>
);

export const AdminLoading: React.FC<{ rows?: number; label?: string }> = ({ rows = 5, label = 'Cargando...' }) => (
    <div className="admin-card" role="status" aria-live="polite">
        <div className="admin-card__body">
            <div className="admin-skeleton admin-skeleton--title" />
            {Array.from({ length: rows }).map((_, i) => (
                <div className="admin-skeleton admin-skeleton--row" key={i} />
            ))}
            <span className="visually-hidden">{label}</span>
        </div>
    </div>
);

interface AdminErrorProps {
    message: string;
    onRetry: () => void;
}

export const AdminError: React.FC<AdminErrorProps> = ({ message, onRetry }) => (
    <div className="admin-state admin-state--error" role="alert">
        <span className="admin-state__icon admin-state__icon--error"><AlertCircle size={26} /></span>
        <h5 className="admin-state__title">No pudimos cargar la información</h5>
        <p className="admin-state__text">{message}</p>
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onRetry}>Reintentar</button>
    </div>
);

interface AdminEmptyProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
    actionLabel?: string;
    onAction?: () => void;
}

export const AdminEmpty: React.FC<AdminEmptyProps> = ({ title, description, icon: Icon = Inbox, actionLabel, onAction }) => (
    <div className="admin-state">
        <span className="admin-state__icon"><Icon size={26} /></span>
        <h5 className="admin-state__title">{title}</h5>
        {description && <p className="admin-state__text">{description}</p>}
        {actionLabel && onAction && (
            <button type="button" className="btn btn-outline-secondary btn-sm mt-2" onClick={onAction}>{actionLabel}</button>
        )}
    </div>
);
