import { useEffect, useState } from "react";
import axios from "axios";

export default function ShiftForm({ refreshShifts, selectedShift, closeModal }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    roleNeeded: "",
    location: "",
  });

  const [message, setMessage] = useState("");
  const API_URL = import.meta.env.VITE_API_URL; // backend URL

  // Pre-fill form if editing
  useEffect(() => {
    if (selectedShift) {
      setFormData({
        title: selectedShift.title,
        date: selectedShift.date.split("T")[0], // format for input[type=date]
        startTime: selectedShift.startTime,
        endTime: selectedShift.endTime,
        roleNeeded: selectedShift.roleNeeded,
        location: selectedShift.location,
      });
    }
  }, [selectedShift]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedShift) {
        // Edit mode
        await axios.put(`${API_URL}/shifts/${selectedShift._id}`, formData);
        setMessage("Shift updated successfully!");
        if (closeModal) closeModal();
      } else {
        // Create mode
        await axios.post(`${API_URL}/shifts`, formData);
        setMessage("Shift created successfully!");
      }

      // Clear form for create mode
      if (!selectedShift) {
        setFormData({
          title: "",
          date: "",
          startTime: "",
          endTime: "",
          roleNeeded: "",
          location: "",
        });
      }

      // Refresh the shift list
      if (refreshShifts) refreshShifts();

      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Failed to submit shift");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className={`${selectedShift ? "" : "max-w-md mx-auto mt-10 p-6 border rounded shadow"}`}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="title"
          placeholder="Shift Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="roleNeeded"
          placeholder="Role Needed"
          value={formData.roleNeeded}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className={`${
            selectedShift ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
          } text-white p-2 rounded`}
        >
          {selectedShift ? "Update Shift" : "Create Shift"}
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
