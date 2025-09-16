import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { loginUser } from "./api/userApi";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try{
            const data = await loginUser({email, password});

            //Normalize role to lowercase
            const role = data.user.role.toLowerCase();

            // Store token for authenticated requests
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", role);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("userId", data.user._id);

            //Redirect based on role
            if (role === "admin") navigate("/admin");
            else if (role === "client") navigate ("/client");
            else if (role === "employee") navigate("/employee");
        } catch (err) {
            setError(err.message); //Display backend error
        }
    };
     return (
        <>
            <Navbar />
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-80">
                    <h2 className="text-xl font-bold mb-4">Login</h2>

                    {error && <p className="mb-2 text-red-600">{error}</p>}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full mb-2 border border-gray-300 p-2 rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full mb-2 border border-gray-300 p-2 rounded"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
            </div>
        </>
    );
};