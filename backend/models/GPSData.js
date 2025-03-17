import mongoose from "mongoose";

const gpsDataSchema = new mongoose.Schema({
    truckNo: { type: String, required: true },
    date: { type: Date, required: true },
    kmTravelled: { type: Number, required: true }
}, { timestamps: true });  // ✅ Adds createdAt and updatedAt

// 🚀 Automatically drop unique index on truckNo and date
gpsDataSchema.index({ truckNo: 1, date: 1 }, { unique: false });  // ✅ Ensures multiple entries

const GPS = mongoose.model("GPS", gpsDataSchema);

// 🚀 Drop any existing unique index (this runs once when the server starts)
GPS.collection.dropIndexes().catch((err) => {
    console.log("Indexes not found or already dropped:", err.message);
});

export default GPS;
