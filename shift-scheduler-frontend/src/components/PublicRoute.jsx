import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    if (token) {
        if (role === "admin") return <Navigate to="/admin" replace />;
        if (role === "client") return <Navigate to="/client" replace />;
        if (role === "employee") return <Navigate to="/employee" replace />;
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}