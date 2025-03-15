import mongoose from "mongoose";

const warrantySchema = new mongoose.Schema({
    uniqueId: { type: String, unique: true, required: true }, // ✅ Required added
    warrantyType: { type: String, enum: ["Time", "KM"], required: true },
    expiry: { type: mongoose.Schema.Types.Mixed, required: true } // Can store Date or Number
});

// ✅ Ensure index is correctly applied
warrantySchema.index({ uniqueId: 1 }, { unique: true });

const Warranty = mongoose.model("Warranty", warrantySchema);

export default Warranty;
