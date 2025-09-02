import {NavLink,Link, Outlet, useNavigate} from "react-router-dom";
import dashboardLinks from "./dashboardLinks";

export default function DashboardLayout() {
    //Read role from localStorage instead of passing as a prop
    const role = localStorage.getItem("role") || "employee";
    const links = dashboardLinks[role.toLowerCase()] || [];
    const navigate = useNavigate();

    //Parse user from localStorage
    const user = JSON.parse(localStorage.getItem("user")) ||{name:"User"};

    const handleLogout = () => {
        //Clear auth info
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");

        //Redirect to home
        navigate("/");
    };


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
                                <NavLink
                                to={link.path === "/" ? `/${role.toLowerCase()}` : `/${role.toLocaleLowerCase()}/${link.path}`}
                                className={({isActive}) =>
                                `block p-2 rounded transition ${isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"}`}
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

{/*main Content*/}

            <div className="flex-1 flex flex-col">
                <header className="bg-white border-b border-gray-300 p-4 flex justify-between items-center">
                    <div>
                        <Link to="/" className="text-blue-600 font-semibold hover:underline">Home</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="font-medium">Hi, {user.name}</span>
                        <button 
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                        onClick={handleLogout}
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