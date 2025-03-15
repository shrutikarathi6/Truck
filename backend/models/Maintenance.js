// models/Maintenance.js
// const mongoose = require("mongoose");
import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema({
    truckNo: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    installationDate: { type: Date, required: true },
    initialodoreading: { type: Number, required: true },
    odoReading: { type: Number, required: true },
    warrantyPeriod: { type: Number, required: true }, // in days or kilometers
    warrantyType: { type: String, enum: ["Time", "KM"], required: true },
    uniqueId: { type: String, required: true, unique: true } // truckNo + date + category
});

const Maintenance= mongoose.model("Maintenance", maintenanceSchema);
export default Maintenance; 
