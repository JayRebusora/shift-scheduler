import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        date: {type: Date, required: true},
        startTime: {type: String, required: true},
        endTime: {type: String, required: true},
        roleNeeded: {type: String, required: true},
        location: {type: String, required: true},
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        },
        assignedTo: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ["unassigned", "assigned", "accepted", "declined"],
            default: "unassigned"
        }
    },
    {timestamps: true}
);

export default mongoose.model("Shift", shiftSchema);