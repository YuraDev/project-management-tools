import { JSX } from "react";
import { useAuth } from "../../layouts/authProvider/AuthProvider";
import { Navigate } from "react-router-dom";

interface ProtectedRoute {
    element: JSX.Element,
}

const ProtectedRoute = ({ element }: ProtectedRoute) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? element : <Navigate to={"/login"} replace/>
}

export default ProtectedRoute;