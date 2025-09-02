import { Link } from "react-router-dom";
import Navbar from "../Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome to Shift Scheduler</h2>
        <p>Manage shifts, schedules, and staff efficiently!</p>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} My Agency App. All rights reserved.</p>
        <div className="flex justify-center gap-6">
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}
