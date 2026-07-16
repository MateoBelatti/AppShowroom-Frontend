// src/components/layotus/ProtectedRoute.tsx

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.hook';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (requiredRole && user?.rol !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;