// /frontend/src/pages/ManageEmployees.jsx
import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../api/userApi";
import EditUserModal from "../components/EditUserModal";
import Toast from "../components/Toast";

export default function ManageEmployees() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editUser, setEditUser] = useState(null);
  const [toast, setToast] = useState(null);
  const usersPerPage = 5;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setToast({ message: "Failed to fetch users", type: "error" });
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(u => u._id !== id));
      setToast({ message: "Employee deleted successfully", type: "success" });
    } catch {
      setToast({ message: "Failed to delete employee", type: "error" });
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Employees</h2>

      <table className="w-full border border-gray-300 rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.phone}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border justify-center flex gap-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 hover: scale-105 transition-transform"
                  onClick={() => setEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex gap-2">
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded border ${currentPage === i+1 ? "bg-gray-400" : "hover:bg-gray-200"}`}
            onClick={() => setCurrentPage(i+1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Edit Modal */}
      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onUpdate={(updatedUser) => {
            setUsers(prev => prev.map(u => u._id === updatedUser._id ? updatedUser : u));
            setEditUser(null);
            setToast({ message: "Employee updated successfully", type: "success" });
          }}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
