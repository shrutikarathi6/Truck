// models/Truck.js
// const mongoose = require("mongoose");
import mongoose from "mongoose";

const truckSchema = new mongoose.Schema({
    truckNo: { type: String,unique:true},
    odoReading: { type: Number },
    lastUpdated: { type: Date}
})

const Truck= mongoose.model("Truck", truckSchema);
export default Truck;
