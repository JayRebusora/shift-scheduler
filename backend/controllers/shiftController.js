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