import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./Signup";
import Login from "./Login";
import DashboardLayout from "./components/DashboardLayout";

function Placeholder({title}) {
  return <h1 className="text-2xl font-bold">{title}</h1>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />

        {/*Admin Dashboard*/}
        <Route path="/admin" element={<DashboardLayout role="admin" />}>
        <Route index element={<Placeholder title = "Admin Dashboard" />} />
        <Route path="manage-employee" element={<Placeholder title="Admin Dashboard" />} />
        <Route path="shifts" element={<Placeholder title="Shifts" />} />
        <Route path="staff-schedule" element={<Placeholder title="Staff Schedule" />} />
        <Route path="credentialing" element={<Placeholder title="Credentialing" />} />
        <Route path="reports" element={<Placeholder title="Reports" />} />
        <Route path="messages" element={<Placeholder title="Messages" />} />
        <Route path="notifications" element={<Placeholder title="Notifications" />} />
        <Route path="settings" element={<Placeholder title="Settings" />} />
        </Route>

        {/*Client Dashboard*/}
        <Route path="/client" element={<DashboardLayout role="client" />}>
        <Route index element={<Placeholder title = "Client Dashboard" />} />
        <Route path="shifts" element={<Placeholder title="Shifts" />} />
        <Route path="staff-schedule" element={<Placeholder title="Staff Schedule" />} />
        <Route path="reports" element={<Placeholder title="Reports" />} />
        <Route path="messages" element={<Placeholder title="Messages" />} />
        <Route path="notifications" element={<Placeholder title="Notifications" />} />
        <Route path="settings" element={<Placeholder title="Settings" />} />
        </Route>

        {/*Employee Dashboard*/}
        <Route path="/employee" element={<DashboardLayout role="employee" />}>
        <Route index element={<Placeholder title = "Employee Dashboard" />} />
        <Route path="profile" element={<Placeholder title="My Profile" />} />
        <Route path="credentials" element={<Placeholder title="My Credentials" />} />
        <Route path="scheduling" element={<Placeholder title="Scheduling" />} />
        <Route path="shift-request" element={<Placeholder title="Shift Request" />} />
        <Route path="messages" element={<Placeholder title="Messages" />} />
        <Route path="notifications" element={<Placeholder title="Notifications" />} />
        <Route path="settings" element={<Placeholder title="Settings" />} />
        </Route>
      </Routes>
    </Router>
  )
}