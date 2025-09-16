import { useEffect, useState } from "react";
import axios from "axios";
import ShiftForm from "../components/ShiftForm";

export default function ShiftsPage() {
  const [shifts, setShifts] = useState([]);
  const [message, setMessage] = useState("");

  // Modal State
  const [editingShift, setEditingShift] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all shifts
  const fetchShifts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/shifts");
      setShifts(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch shifts");
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  // Delete a shift
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/shifts/${id}`);
      setShifts(shifts.filter((shift) => shift._id !== id));
      setMessage("Shift deleted successfully");
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete shift");
    }
  };

  // Publish a shift
  const handlePublish = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/shifts/${id}/publish`);
      setShifts(shifts.map((shift) => (shift._id === id ? res.data : shift)));
      setMessage("Shift published successfully");
    } catch (err) {
      console.error(err);
      setMessage("Failed to publish shift");
    }
  };

  // Open edit modal
  const openEditModal = (shift) => {
    setEditingShift(shift);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingShift(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Shifts</h1>

      {/* Shift Form for creating a new shift */}
      <ShiftForm refreshShifts={fetchShifts} />

      {/* Status Message */}
      {message && <p className="mt-4 text-green-600">{message}</p>}

      {/* Shifts Table */}
      <table className="w-full border-collapse mt-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Title</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Role Needed</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Published</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <tr key={shift._id} className="hover:bg-gray-100">
              <td className="border p-2">{shift.title}</td>
              <td className="border p-2">{new Date(shift.date).toLocaleDateString()}</td>
              <td className="border p-2">{shift.startTime} - {shift.endTime}</td>
              <td className="border p-2">{shift.roleNeeded}</td>
              <td className="border p-2">{shift.location}</td>
              <td className="border p-2">{shift.status}</td>
              <td className="border p-2 flex items-center gap-2">
                {shift.isPublished ? "Yes" : "No"}
                {!shift.isPublished && shift.updatedAt > shift.createdAt && (
                  <span className="text-sm text-red-500 ml-2">Needs republish</span>
                )}
              </td>
              <td className="border p-2 flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  onClick={() => openEditModal(shift)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(shift._id)}
                >
                  Delete
                </button>
                {!shift.isPublished && (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    onClick={() => handlePublish(shift._id)}
                  >
                    Publish
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isModalOpen && editingShift && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-96 relative">
            <h2 className="text-xl font-bold mb-4">Edit Shift</h2>
            <ShiftForm
              refreshShifts={fetchShifts}
              selectedShift={editingShift}
              closeModal={closeEditModal}
            />
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeEditModal}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
