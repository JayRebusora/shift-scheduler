import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./Signup";
import Login from "./Login";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ManageEmployees from "./pages/ManageEmployees";

function Placeholder({ title }) {
  return <h1 className="text-2xl font-bold">{title}</h1>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect blank root path to home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Admin Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<Placeholder title="Admin Dashboard" />} />
            <Route path="manage-employee" element={<ManageEmployees />} />
            <Route path="shifts" element={<Placeholder title="Shifts" />} />
            <Route path="staff-schedule" element={<Placeholder title="Staff Schedule" />} />
            <Route path="credentialing" element={<Placeholder title="Credentialing" />} />
            <Route path="reports" element={<Placeholder title="Reports" />} />
            <Route path="messages" element={<Placeholder title="Messages" />} />
            <Route path="notifications" element={<Placeholder title="Notifications" />} />
            <Route path="settings" element={<Placeholder title="Settings" />} />
          </Route>
        </Route>

        {/* Client Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={["client"]} />}>
          <Route path="/client" element={<DashboardLayout />}>
            <Route index element={<Placeholder title="Client Dashboard" />} />
            <Route path="shifts" element={<Placeholder title="Shifts" />} />
            <Route path="staff-schedule" element={<Placeholder title="Staff Schedule" />} />
            <Route path="reports" element={<Placeholder title="Reports" />} />
            <Route path="messages" element={<Placeholder title="Messages" />} />
            <Route path="notifications" element={<Placeholder title="Notifications" />} />
            <Route path="settings" element={<Placeholder title="Settings" />} />
          </Route>
        </Route>

        {/* Employee Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={["employee"]} />}>
          <Route path="/employee" element={<DashboardLayout />}>
            <Route index element={<Placeholder title="Employee Dashboard" />} />
            <Route path="profile" element={<Placeholder title="My Profile" />} />
            <Route path="credentials" element={<Placeholder title="My Credentials" />} />
            <Route path="scheduling" element={<Placeholder title="Scheduling" />} />
            <Route path="shift-request" element={<Placeholder title="Shift Request" />} />
            <Route path="messages" element={<Placeholder title="Messages" />} />
            <Route path="notifications" element={<Placeholder title="Notifications" />} />
            <Route path="settings" element={<Placeholder title="Settings" />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
