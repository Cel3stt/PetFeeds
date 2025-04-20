import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./database/connectDB.js";
import scheduleRoutes from "./routes/schedule.routes.js";
import snapshotRoutes from "./routes/snapshot.route.js";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//upload path
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/schedule", scheduleRoutes);
app.use("/api/snapshot", snapshotRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port", PORT);
});
