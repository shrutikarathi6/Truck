import express from "express";
import { 
    addMaintenance, 
    getMaintenanceHistory, 
    getNotifications 
} from "../controllers/maintenanceController.js";

const router = express.Router();

// Add Maintenance Entry
router.post("/add", addMaintenance);

// Get Maintenance History for a Truck
router.get("/history/:truckNo", getMaintenanceHistory);

// Get Notifications
router.get("/notifications", getNotifications);

export default router;
