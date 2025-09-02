import {useState} from "react";
import Navbar from "./Navbar";
import { signupUser } from "./api/userApi";

export default function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "Employee",
        position: "",
        password: "",
    });

    const [error, setError] = useState(""); //For error messages
    const [success, setSuccess] = useState(""); //For success messages

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try{
            // Preapre data: only include position if Employee
            const dataToSend = { ...formData};
            if (formData.role !== "Employee") {
                delete dataToSend.position;
            }
            const data = await signupUser(dataToSend);
            setSuccess(`Signup successful! Welcome, ${data.user.name}`);
            localStorage.setItem('token', data.token); //store token for authentication
        } catch (err) {
            setError(err.message || "Signup failed. Please try again.");
        }
    };

    return (
        <>
        <div>
            <Navbar />
        </div>
        <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

            {/* Error Message*/}
            {error && (
                <p className="mb-4 text-red-600 text-center font-medium">
                    {error}
                    </p>
            )}

            {/* Success Message*/}
            {success && (
                <p className="mb-4 text-green-600 text-center font-medium">
                    {success}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                type="text" 
                name="name"
                placeholder="Full Name"
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.name}
                onChange={handleChange}
                required
                />
                <input 
                type="email"
                name="email"
                placeholder="Email" 
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.email}
                onChange={handleChange}
                required
                />
                <input 
                type="tel" 
                name="phone"
                placeholder="Phone Number"
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.phone}
                onChange={handleChange}
                required
                />
                <select 
                name="role" 
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                >
                    <option value="Employee">Employee</option>
                    <option value="Admin">Admin</option>
                    <option value="Client">Client</option>
                </select>
                {/* Conditionally show position if role is Employee*/}
                {formData.role === "Employee" && (
                    <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                    >
                    <option value="" disabled hidden>Select Position</option>
                    <option value="Nurse">Nurse</option>
                    <option value="STNA">STNA</option>
                    <option value="Other">Other</option>
                    </select>
                )}
                <input 
                type="password" 
                name="password"
                placeholder="Password"
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.password}
                onChange={handleChange}
                required
                />
                <button
                type="Submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                    Sign Up
                </button>
            </form>
        </div>
        </>
    );
}