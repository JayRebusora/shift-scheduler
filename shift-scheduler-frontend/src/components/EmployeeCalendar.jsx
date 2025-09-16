import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Toast from "../components/Toast";

export default function EmployeeCalendar() {
  const [shifts, setShifts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [toast, setToast] = useState(null);
  const employeeId = "64f11def987654321abcdef0"; // replace with logged-in employee id

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/shifts`);
        const data = await res.json();
        const assignedShifts = data.filter(
          (shift) => shift.assignedTo?._id === employeeId
        );
        setShifts(assignedShifts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchShifts();
  }, []);

  const handleResponse = async (shiftId, action) => {
    try {
      const res = await fetch(`http://localhost:5000/api/shifts/${shiftId}/respond`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();

      if (res.ok) {
        setShifts((prev) =>
          prev.map((shift) =>
            shift._id === shiftId ? { ...shift, status: action } : shift
          )
        );
        setToast({ message: `Shift ${action}!`, type: "success" });
      } else {
        setToast({ message: data.message, type: "error" });
      }
    } catch (err) {
      console.error(err);
      setToast({ message: "Failed to respond to shift", type: "error" });
    }
  };

  // Filter shifts for the selected date
  const shiftsForDate = shifts.filter(
    (shift) =>
      new Date(shift.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Shift Calendar</h1>

      <Calendar
        value={selectedDate}
        onChange={setSelectedDate}
        tileContent={({ date, view }) => {
          // Show shift titles on the calendar
          const dayShifts = shifts.filter(
            (shift) => new Date(shift.date).toDateString() === date.toDateString()
          );
          return (
            <ul>
              {dayShifts.map((shift) => (
                <li key={shift._id} className="text-xs text-blue-600">
                  {shift.title}
                </li>
              ))}
            </ul>
          );
        }}
      />

      <h2 className="text-xl font-bold mt-6 mb-2">
        Shifts on {selectedDate.toDateString()}
      </h2>
      {shiftsForDate.length === 0 ? (
        <p>No shifts on this day.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Time</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {shiftsForDate.map((shift) => (
              <tr key={shift._id}>
                <td className="border px-4 py-2">{shift.title}</td>
                <td className="border px-4 py-2">
                  {new Date(`1970-01-01T${shift.startTime}`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} 
                  {" - "}
                  {new Date(`1970-01-01T${shift.endTime}`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </td>
                <td className="border px-4 py-2 capitalize">{shift.status}</td>
                <td className="border px-4 py-2">
                  {shift.status === "assign" ? (
                    <div className="flex gap-2">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        onClick={() => handleResponse(shift._id, "accepted")}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => handleResponse(shift._id, "declined")}
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <span>Response recorded</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
