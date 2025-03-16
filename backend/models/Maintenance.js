// models/Maintenance.js
// const mongoose = require("mongoose");
import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema({
    truckNo: { type: String},
    category: { type: String },
    subCategory: { type: String },
    installationDate: { type: Date },
    initialodoreading: { type: Number },
    odoReading: { type: Number },
    warrantyPeriod: { type: Number}, // in days or kilometers
    warrantyType: { type: String, enum: ["Time", "KM"] },
    uniqueId: { type: String, unique: true },
    expiry: { type: mongoose.Schema.Types.Mixed, required: true } // truckNo + date + category
});

const Maintenance= mongoose.model("Maintenance", maintenanceSchema);
export default Maintenance; 

// // Get Notifications
// export const getNotifications = async (req, res) => {
//     try {
//         const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

//         const warranties = await Maintenance.find();
//         const notifications = [];

//         for (const warranty of warranties) {
//             // const { uniqueId, warrantyType, expiry } = warranty;
//             // const maintenance = await Maintenance.findOne({ uniqueId });  // ✅ Fix: Correct query
//             // if (!maintenance) return res.status(404).json({ message: "Maintenance record not found." });

//             const { installationDate, truckNo,warrantyType, initialodoreading,expiry } = warranty;
//             const truck = await Truck.findOne({ truckNo });  // ✅ Fix: Correct query
//             if (!truck) return res.status(404).json({ message: "Truck not found." });

//             const odoreading = truck.odoReading;


//             let totalKM = 0;
//             totalKM = odoreading-initialodoreading;

//             if ((warrantyType === 'km' && totalKM >= expiry) ||
//                 (warrantyType === 'time' && expiry===today)) {
//                 notifications.push({ truckNo, message: `Warranty period expired for category installed on ${installationDate}` });
//             }
//         }

//         res.status(200).json(notifications);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };