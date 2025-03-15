import mongoose from "mongoose";

const warrantySchema = new mongoose.Schema({
    uniqueId: { type: String, required: true, unique: true },
    warrantyType: { type: String, enum: ["Time", "KM"], required: true },
    expiry: { type: mongoose.Schema.Types.Mixed, required: true } // Can store Date or Number
});

const Warranty = mongoose.model('Warranty', warrantySchema);

export default Warranty;
