export const signupUser = async (formData) => {
    try {
        const res = await fetch("http://localhost:5000/api/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Signup failed!")
        }
        return data; // should include {user, token}
    } catch (err) {
        throw err;
    }
};

// api/userAPI.js
export const loginUser = async (formData) => {
    const res =await fetch ("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
        //Throw error to be caught in handleSubmit
        throw new Error(data.message || "Login failed!");
    }
    return data; // { user, token}
};