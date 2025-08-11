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
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                //Simple US phone number regex (e.g., 123-456-7890 or (123) 456-7890)
                return /^(\+1)?\s?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }, 
    role: {
        type: String,
        enum: ['Employee', 'Admin', 'Client'],
        default: 'Employee',
    },
    position: {
        type: String,
        enum: ['Nurse', 'STNA', 'other'],
        required: function() {
            return this.role === 'Employee'; //Position required only if role is Employee.
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);
export default User;