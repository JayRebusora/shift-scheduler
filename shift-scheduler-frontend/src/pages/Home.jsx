import { Link } from "react-router-dom";
import Navbar from "../Navbar";

export default function Home() {
    return (
        <div>
            <Navbar />
            <main className="p-6">
                <h2 className="text-2xl font-bold mb-4">Welcome to Shift Scheduler</h2>
                <p>Manage shifts, schedules, and staff efficiently!</p>
            </main>
        </div>
    );
}