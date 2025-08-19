import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!role) {
            alert("Please select a role");
            return;
        }
        if (role === "admin") navigate("/admin")
            if (role === "client") navigate("/client")
                if (role === "employee") navigate("/employee")
    };

    return (
        <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <input 
                type="text" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                >
                   <option value="">Select Role</option> 
                   <option value="admin">Admin</option>
                   <option value="client">Client</option>
                   <option value="employee">Employee</option>
                </select>
                <button type="submit" className="w-full bg-blue-600 texxt-white py-2 rounded hover:bg-blue-700">
                    Login
                </button>
            </form>
        </div>
        </>
    );
}