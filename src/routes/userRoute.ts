import express from "express";
import { exportDataToDB, getAllUsers } from "../controller/userController";
const route = express.Router();

// GET
// Import Data to DB
route.post("/export-data", exportDataToDB);

// POST
// Get all user details
route.post("/list", getAllUsers);

export default route;
