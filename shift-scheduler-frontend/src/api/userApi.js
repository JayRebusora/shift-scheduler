// api/userAPI.js

const API_URL = import.meta.env.VITE_API_URL; // ← your backend URL

// Signup
export const signupUser = async (formData) => {
    try {
        const res = await fetch(`${API_URL}/users/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Signup failed!");
        }
        return data; // { user, token }
    } catch (err) {
        throw err;
    }
};

// Login
export const loginUser = async (formData) => {
    const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Login failed!");
    }
    return data; // { user, token }
};

// Fetch all users
export const fetchUsers = async () => {
    const res = await fetch(`${API_URL}/users`);
    return await res.json();
};

// Delete user
export const deleteUser = async (id) => {
    const res = await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
    return await res.json();
};

// Update user
export const updateUser = async (id, data) => {
    const res = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return await res.json();
};
