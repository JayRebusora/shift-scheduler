import express from "express";
import { 
    createShift,
    getShifts,
    updateShift,
    deleteShift,
    publishShift 
} from "../controllers/shiftController.js";


const router = express.Router();

//create
router.post("/", createShift);

//read
router.get("/", getShifts);

//Update (edit)
router.put("/:id",updateShift);

//Delete
router.delete("/:id", deleteShift);

//Publish (optional separate route)
router.put("/:id/publish", publishShift);

export default router;