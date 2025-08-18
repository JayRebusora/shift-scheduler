import {useState} from "react"

export default function Login(){
    const [formData, setFormData] = useState({
        email:"",
        password:"",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login data:", formData);
    };

    
    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                type="email" 
                name="email"
                placeholder="Email"
                value={formData.email}
                className="w-full border border-gray-300 p-2 rounded"
                onChange={handleChange}
                required
                />
                <div className="relative mb-4">
                <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                placeholder="password"
                value={formData.password}
                className="w-full border border-gray-300 p-2 pr-16 rounded"
                onChange={handleChange}
                required
                />
                <button 
                type="button"
                className="absolute inset-y-0 right-0 px-3 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Show"}  
                </button>
                </div>

                <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
}