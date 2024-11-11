import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { databaseConnection } from "./config/config";
import mongoose from "mongoose";

import userRoute from "./routes/userRoute";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database Config
mongoose.set("strictQuery", false);
databaseConnection();

// Routes
app.use("/api/user", userRoute);

// initialization Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.on("error", (err: any) => {
  console.log(`Server Down: ${err.message}`);
});
