// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js';
import shiftRoutes from "./routes/shiftRoutes.js";
import cors from "cors";




dotenv.config();
connectDB();

const app = express();

//Middleware
app.use(cors({
    origin: ["https://shift-scheduler-delta.vercel.app/"],
    credentials:true,
}));
app.use(express.json());

//Test root route
app.get('/', (req, res) => {
    res.send('Shift Scheduler API is running...');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/shifts', shiftRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});