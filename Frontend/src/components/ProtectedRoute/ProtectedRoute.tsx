import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
    const { token, isAdmin } = useAuth();

    if (!token) return <Navigate to="/" replace />;
    if (requireAdmin && !isAdmin) return <Navigate to="/" replace />;

    return <>{children}</>;
};

export default ProtectedRoute;