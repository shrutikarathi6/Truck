// routes/gpsRoutes.js
import express from "express";
import { addGPSData, getTruckHistory } from "../controllers/gpsController.js";

const router = express.Router();

router.post("/add-gps", addGPSData);
router.get("/history/:truckNumber", getTruckHistory);

export default router;
