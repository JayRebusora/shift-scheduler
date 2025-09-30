import { useEffect, useState } from "react";
import Toast from "../components/Toast";

export default function AdminShifts() {
  const [shifts, setShifts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState({});
  const [toast, setToast] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL; // backend URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [shiftRes, userRes] = await Promise.all([
          fetch(`${API_URL}/shifts?status=published`),
          fetch(`${API_URL}/users`),
        ]);
        const [shiftData, userData] = await Promise.all([shiftRes.json(), userRes.json()]);
        setShifts(shiftData);
        setUsers(userData.filter((user) => user.role === "employee")); // Only employees
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API_URL]);

  const handleAssign = async (shiftId) => {
    const employeeId = selectedUser[shiftId];
    if (!employeeId) {
      setToast({ message: "Please select an employee to assign.", type: "error" });
      return;
    }

    try {
      await fetch(`${API_URL}/shifts/${shiftId}/assign`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId }),
      });

      const res = await fetch(`${API_URL}/shifts?status=published`);
      const data = await res.json();
      setShifts(data);
      setSelectedUser((prev) => ({ ...prev, [shiftId]: "" }));
      setToast({ message: "Shift assigned successfully!", type: "success" });
    } catch (error) {
      console.error("Error assigning shift:", error);
      setToast({ message: "Failed to assign shift.", type: "error" });
    }
  };

  const handleUnassign = async (shiftId) => {
    try {
      await fetch(`${API_URL}/shifts/${shiftId}/assign`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: null }),
      });

      const res = await fetch(`${API_URL}/shifts?status=published`);
      const data = await res.json();
      setShifts(data);
      setToast({ message: "Shift unassigned successfully!", type: "success" });
    } catch (error) {
      console.error("Error unassigning shift:", error);
      setToast({ message: "Failed to unassign shift.", type: "error" });
    }
  };

  if (loading) return <div className="p-4">Loading Shifts...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Published Shifts</h1>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {shifts.length === 0 ? (
        <p>No published shifts found.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Title</th>
              <th className="border px-4 py-2 text-left">Date</th>
              <th className="border px-4 py-2 text-left">Time</th>
              <th className="border px-4 py-2 text-left">Assigned</th>
              <th className="border px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift._id}>
                <td className="border px-4 py-2">{shift.title}</td>
                <td className="border px-4 py-2">{new Date(shift.date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">
                  {new Date(`1970-01-01T${shift.startTime}`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  {" - "}
                  {new Date(`1970-01-01T${shift.endTime}`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </td>
                <td className="border px-4 py-2">
                  {shift.assignedTo ? shift.assignedTo.name : "Not assigned"}
                </td>
                <td className="border px-4 py-2">
                  {shift.assignedTo ? (
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleUnassign(shift._id)}
                    >
                      Unassign
                    </button>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <select
                        value={selectedUser[shift._id] || ""}
                        onChange={(e) =>
                          setSelectedUser((prev) => ({ ...prev, [shift._id]: e.target.value }))
                        }
                        className="border px-2 py-1 rounded"
                      >
                        <option value="">Select employee</option>
                        {users.map((user) => (
                          <option key={user._id} value={user._id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => handleAssign(shift._id)}
                      >
                        Assign
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
