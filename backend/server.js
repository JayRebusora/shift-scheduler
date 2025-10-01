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
const allowedOrigins = [
    "https://shift-scheduler-delta.vercel.app",
    "https://shift-scheduler-git-main-jays-projects-66051bf3.vercel.app"
];
//Middleware
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like mobile apps or curl)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
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