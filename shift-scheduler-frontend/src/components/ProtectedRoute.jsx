import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({allowedRoles}) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        //Not logged in -> redirect to login
        return <Navigate to="/login" replace />
    }
    if (allowedRoles && !allowedRoles.includes(role)) {
        //Logged in but role not allowed -> redirect to home
        return <Navigate to="/" replace />
    }
    // If everything is fine -> render child routes
    return <Outlet />;
}