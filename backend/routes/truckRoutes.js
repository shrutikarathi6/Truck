import express from "express";
import { addTruck } from "../controllers/TruckController.js";

const router = express.Router();

// Route for adding a truck
router.post("/add", addTruck);

export default router;
