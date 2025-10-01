import mongoose from "mongoose";
import Shift from "../models/Shift.js";

// POST /api/shifts
export const createShift = async (req, res) => {
  try {
    const { title, date, startTime, endTime, roleNeeded, location } = req.body;

    // Temporary ObjectId for testing (24 hex chars)
    const createdBy = new mongoose.Types.ObjectId("64f11def987654321abcdef0");

    const newShift = await Shift.create({
      title,
      date,
      startTime,
      endTime,
      roleNeeded,
      location,
      createdBy
    });

    res.status(201).json(newShift);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get all shifts
export const getShifts = async (req, res) => {
    try {
        const shifts = await Shift.find().populate("createdBy", "name").populate("assignedTo", "name");
        res.json(shifts);
    }catch (err) {
        res.status(500).json({message: err.message});
    }
};

//Update a shift
export const updateShift = async (req, res) => {
    try {
        const {id} = req.params;

        //When editing, reset isPublished to false
        const updatedShift = await Shift.findByIdAndUpdate(
            id,
            {...req.body, isPublished: false},
            {new: true}
        );
        if (!updatedShift) return res.status(404).json({message: "Shift not found"});
        res.json(updatedShift);
    }catch (err) {
        res.status(500).json({message: err.message});
    }
};

//Delete a shift
export const deleteShift = async (req, res) => {
    try {
        const {id} = req.params;
        const deleted = await Shift.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({message: "Shift not found"});
        res.json({message: "Shift deleted successfully"});
    }catch (err) {
        res.status(500).json({message: err.message});
    }
};

//Publish a shift (set isPublished to true)
export const publishShift = async (req, res) => {
    try {
        const {id} = req.params;
        const published = await Shift.findByIdAndUpdate(
            id,
            {isPublished: true},
            {new: true}
        );
        if (!published) return res.status(404).json({message: "Shift not found"});
        res.json(published);
    }catch (err) {
        res.status(500).json({message: err.message});
    }
};

//Assign Shift
export const assignShift = async (req, res) => {
    const {id} = req.params;
    const {employeeId} = req.body;

    try {
        const shift = await Shift.findByIdAndUpdate(
            id,
            {assignedTo: employeeId, status:"assigned"},
            {new: true}
        ).populate("assignedTo", "name");

        if (!shift) {
            return res.status(404).json({message:"Shift not found"});
    }
        res.json({message: "Shift assigned successfully", shift});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

//Unassign a shift
export const unassignShift = async (req, res) => {
    const {id} = req.params;
    try {
        const shift = await Shift.findByIdAndUpdate(
            id,
            {assignedTo: null, status: "unassigned"},
            {new: true}
        );
        if (!shift) return res.status(404).json({message: "Shift not found"});
        res.json({message: "Shift unassigned", shift});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

// Employee respond to assigned shift
export const respondToShift = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body; // "accepted" or "declined"

  if (!["accepted", "declined"].includes(action)) {
    return res.status(400).json({ message: "Invalid action" });
  }

  try {
    const shift = await Shift.findById(id);
    if (!shift) return res.status(404).json({ message: "Shift not found" });

    // Check if shift is assigned to an employee
    if (!shift.assignedTo) {
      return res.status(400).json({ message: "Shift is not assigned to any employee" });
    }

    shift.status = action;
    await shift.save();

    res.json({ message: `Shift ${action} successfully`, shift });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get shifts assigned to a specific employee
export const getAssignedShifts = async (req, res) => {
  const { employeeId } = req.query; // received from frontend

  if (!employeeId) return res.status(400).json({ message: "employeeId is required" });

  try {
    const shifts = await Shift.find({ assignedTo: employeeId })
      .populate("createdBy", "name")
      .populate("assignedTo", "name");
    res.json(shifts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

