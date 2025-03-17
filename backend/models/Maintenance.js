// models/Maintenance.js
// const mongoose = require("mongoose");
import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema({
    uniqueId: { type: String, unique: true },
    truckNo: { type: String},
    category: { type: String },
    subCategory: { type: String },
    installationDate: { type: Date },
    odoReading: { type: Number },
    warrantyValue: { type: Number}, // in days or kilometers
    warrantyType: { type: String, enum: ["Time", "KM"] },
    expiry: { type: mongoose.Schema.Types.Mixed } // truckNo + date + category
});

const Maintenance= mongoose.model("Maintenance", maintenanceSchema);
export default Maintenance; 

