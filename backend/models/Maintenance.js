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
    uniqueId: { type: String, unique: true } // truckNo + date + category
});

const Maintenance= mongoose.model("Maintenance", maintenanceSchema);
export default Maintenance; 
