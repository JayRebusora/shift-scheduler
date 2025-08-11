import User from "../models/User.js";


// @desc Create a new user
// @route POST /api/usrs
export const createUser = async (req, res) => {
    try {
        const { name, email, phone, role} = req.body;

        // Simple phone validation
        const phoneRegex = /^\+?[1-9]\d{1,14}$/; //E.164 format
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({message: "Invalid phone number format"});
        }
        const user = await User.create({name, email, phone, role});
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @desc Get all users
// @route GET /api/users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @desc Get a single user by ID
// @route GET /api/users/:id
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({message: "User nto found"});
        }
        res.json(usr);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @desc Update a user
// @route PUT /api/users/:id
export const updateUser = async (req, res) => {
    try {
        const {name, email, phone, role} = req.body;

        //Phone validation again for update
        if (phone) {
            const phoneRegex = /^\+?[1-9]\d{1,14}$/;
            if (!phoneRegex.test(phone)) {
                return res.status(400).json({message: "Invalid phone number format"});
            }
        }
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {name, email, phone, role},
            {new: true, runValidators: true}
        );
        if (!user) {
            return res.status(400).json({message: "User not found"});
        }
        res.json(user);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @desc Delete a user
// @route DELETE /api/users/:id
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.json({message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};