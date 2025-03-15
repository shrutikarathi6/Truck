// models/Truck.js
// const mongoose = require("mongoose");
import mongoose from "mongoose";

const truckSchema = new mongoose.Schema({
    truckNo: { type: String, required: true, unique: true },
    odoReading: { type: Number, required: true },
    lastUpdated: { type: Date, required: true }
})

const Truck= mongoose.model("Truck", truckSchema);
export default Truck;
