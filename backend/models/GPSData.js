import mongoose from "mongoose";

const gpsDataSchema = new mongoose.Schema({
    truckNo: { type: String, required: true },
    date: { type: Date, required: true },
    kmTravelled: { type: Number, required: true }
});

gpsDataSchema.index({ truckNo: 1, date: 1 }, { unique: true });

const GPS = mongoose.model("GPS", gpsDataSchema);
export default GPS;  // ✅ Correct ES Module export
