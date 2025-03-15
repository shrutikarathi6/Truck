// models/Part.js
// const mongoose = require("mongoose");
import mongoose from "mongoose";

const partSchema = new mongoose.Schema({
    partNo: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    purchaseDate: { type: Date, required: true },
    vehicleDetails: { type: String, required: true },
    status: { type: String, enum: ["Active", "Stock", "Scrap"], default: "Active" },
    history: [
        {
            action: { type: String, required: true },
            details: { type: String },
            date: { type: Date, default: Date.now }
        }
    ]
});

const Part= mongoose.model("Part", partSchema);
export default Part;
