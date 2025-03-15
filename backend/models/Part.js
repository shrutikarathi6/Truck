// models/Part.js
// const mongoose = require("mongoose");
import mongoose from "mongoose";

const partSchema = new mongoose.Schema({
    partNo: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    purchaseDate: { type: Date, required: true },
    vehicleDetails: { 
        type: String, 
        required: true,
        validate: {
            validator: function(value) {
                return value === "Stock" || value === "Scrap" || /^[A-Za-z0-9]+$/.test(value); 
                // Allows "Stock", "Scrap", or any truckNo (alphanumeric string)
            },
            message: "vehicleDetails must be a valid truck number, 'Stock', or 'Scrap'."
        }
    },
    history: [
        {
            action: { type: String, required: true },
            date: { type: Date }
        }
    ]
});

const Part= mongoose.model("Part", partSchema);
export default Part;


