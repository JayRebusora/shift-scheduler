import { Link } from "react-router-dom";
import Navbar from "../Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="bg-blue-600 text-white py-20 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Shift Scheduler</h1>
          <p className="text-lg md:text-xl mb-6">Easily manage shifts, schedules, and staff in one place.</p>
          <Link
            to="/dashboard"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Go to Dashboard
          </Link>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition">
              <h3 className="font-semibold text-xl mb-2">Shift Management</h3>
              <p>Assign, unassign, and track shifts effortlessly for all employees.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition">
              <h3 className="font-semibold text-xl mb-2">Notifications</h3>
              <p>Automatic updates and reminders keep your team informed in real-time.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition">
              <h3 className="font-semibold text-xl mb-2">Reports & Analytics</h3>
              <p>Visualize staffing patterns and generate reports for better planning.</p>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="bg-blue-50 py-16 px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to streamline your staffing?</h2>
          <p className="mb-6 text-lg">Sign up and start scheduling shifts in minutes!</p>
          <Link
            to="/signup"
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
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
