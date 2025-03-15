import express from "express";
import { 
    addMaintenance, 
    getNotifications 
} from "../controllers/maintenanceController.js";

const router = express.Router();

// Add Maintenance Entry
router.post("/add", addMaintenance);



// Get Notifications
router.get("/notifications", getNotifications);

export default router;
