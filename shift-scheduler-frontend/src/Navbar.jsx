import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Shift Scheduler</h1>
            <nav className="space-x-4">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
            </nav>
        </header>
    );
}