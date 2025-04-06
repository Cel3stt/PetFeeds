import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './database/connectDB.js';
import scheduleRoutes  from './routes/schedule.routes.js'


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/schedule', scheduleRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port", PORT);
  });
  