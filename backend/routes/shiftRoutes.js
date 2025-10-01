import express from "express";
import { 
    createShift,
    getShifts,
    updateShift,
    deleteShift,
    publishShift, 
    assignShift,
    unassignShift,
    respondToShift,
    getAssignedShifts
} from "../controllers/shiftController.js";


const router = express.Router();

//create
router.post("/", createShift);

//Get assigned shifts
router.get("/assigned", getAssignedShifts);

//read
router.get("/", getShifts);

//Update (edit)
router.put("/:id",updateShift);

//Delete
router.delete("/:id", deleteShift);

//Publish (optional separate route)
router.put("/:id/publish", publishShift);

//Assign shift
router.put("/:id/assign", assignShift);

//Unassign Shift
router.put("/:id/unassign", unassignShift);

//Respond to Shift
router.put("/:id/respond", respondToShift);




export default router;