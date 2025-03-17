import mongoose from "mongoose";

const truckSchema = new mongoose.Schema({
    truckNo: { type: String, unique: true, required: true }, // Ensure it's required
    odoReading: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
});

// Recreate unique index
truckSchema.index({ truckNo: 1 }, { unique: true });

const Truck = mongoose.model("Truck", truckSchema);
export default Truck;
