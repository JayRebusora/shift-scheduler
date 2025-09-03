import {useState} from "react";
import { updateUser } from "../api/userApi";

export default function EditUserModal({user, onClose, onUpdate}) {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updated = await updateUser(user._id, formData);
            onUpdate(updated);
        }catch (err) {
            alert("Failed to update user");
            console.error(err);
        }finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounde w-96 shadow-lg">
                <h3 className="text-lg font-bold mb-4">Edit Employee</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" />
                     <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
                      <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded" />
                       <select name="role" value={formData.role} onChange={handleChange} className="border p-2 rounded">
                            <option value="employee">Employee</option>
                            <option value="admin">Admin</option>
                            <option value="client">Client</option>
                       </select>
                       <div className="flex justify-end gap-2 mt-2">
                        <button type="button" onClick={onClose} className="px-3 py-1 rounded border hover:bg-gray-100">Cancel</button>
                        <button type="submit" className={`px-3 py-1 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`} disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </button>
                       </div>
                </form>
            </div>
        </div>
    );
}