// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js';
import cors from "cors";



dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

//Test root route
app.get('/', (req, res) => {
    res.send('Shift Scheduler API is running...');
});

// ESM route usage
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});