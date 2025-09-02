import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                // E.164 format validation (+1234567890)
                return /^\+?[1-9]\d{1,14}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
    role: {
        type: String,
        enum: ["employee", "admin", "client"],
        default: "employee",
    },
    position: {
        type: String,
        enum: ["Nurse", "STNA", "Other"],
        validate: {
            validator: function(v) {
                // Only validate if role is Employee
                if (this.role !== 'employee') return true;
                return ['Nurse', 'STNA', 'Other'].includes(v);
            },
            message: props => `${props.value} is not a valid position for an Employee!`
        },
        required: function() {
            return this.role === "employee"; // Position required only if role is Employee
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("User", userSchema);
export default User;