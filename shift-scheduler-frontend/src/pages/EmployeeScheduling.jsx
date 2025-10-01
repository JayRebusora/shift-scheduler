import { useEffect, useState } from "react";
import Toast from "../components/Toast";

export default function EmployeeScheduling({ employeeId }) {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    console.log("EmployeeScheduling mounted with employeeId:", employeeId);

    if (!employeeId) {
      console.error("employeeId is null or undefined!");
      setLoading(false);
      return;
    }

    const fetchShifts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/shifts/assigned?employeeId=${employeeId}`);
        const data = await res.json();
        console.log("API response for assigned shifts:", data);

        setShifts(data);
      } catch (err) {
        console.error("Error fetching assigned shifts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchShifts();
  }, [employeeId]);

  const handleRespond = async (shiftId, action) => {
    console.log(`Responding to shift ${shiftId} with action ${action}`);
    try {
      const res = await fetch(`http://localhost:5000/api/shifts/${shiftId}/respond`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      console.log("Response from respond API:", data);

      setShifts(shifts.map(s => s._id === shiftId ? data.shift : s));
      setToast({ message: data.message, type: "success" });
    } catch (err) {
      console.error("Failed to respond to shift:", err);
      setToast({ message: "Failed to respond to shift", type: "error" });
    }
  };

  if (loading) return <div>Loading assigned shifts...</div>;

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {shifts.length === 0 ? (
        <p>No assigned shifts yet.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border px-2">Title</th>
              <th className="border px-2">Date</th>
              <th className="border px-2">Time</th>
              <th className="border px-2">Status</th>
              <th className="border px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift._id}>
                <td className="border px-2">{shift.title}</td>
                <td className="border px-2">{new Date(shift.date).toLocaleDateString()}</td>
                <td className="border px-2">{shift.startTime} - {shift.endTime}</td>
                <td className="border px-2">{shift.status}</td>
                <td className="border px-2 flex gap-2">
                  {shift.assignedTo?._id === employeeId && shift.status === "assigned" && (
                    <>
                      <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleRespond(shift._id, "accepted")}>
                        Accept
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleRespond(shift._id, "declined")}>
                        Decline
                      </button>
                    </>
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
