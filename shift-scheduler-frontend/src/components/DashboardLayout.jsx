import {Link, Outlet} from "react-router-dom";
import dashboardLinks from "./dashboardLinks";

export default function DashboardLayout({role}) {
    const links = dashboardLinks[role] || [];

    return (
        <div className="flex h-screen">
            <aside className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-4 text-2xl font-bold border-b border-gray-700">
                    {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
                </div>
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {links.map((link,index) => (
                            <li key={index}>
                                <Link 
                                to={link.path}
                                className="block p-2 rounded hover:bg-gray-700"
                                >
                                {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="bg-white border-b border-gray-300 p-4 flex justify-between items-center">
                    <div>
                        <Link to="/" className="text-blue-600 font-semibold hover:underline">Home</Link>
                    </div>
                    <div>
                        <button 
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                        onClick={() => {
                            console.log("Logout clicked!")
                        }}
                        >
                            Logout
                        </button>
                    </div>
                </header>
           

            <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
                <Outlet />
            </main>
            </div>
         </div>
    );
}