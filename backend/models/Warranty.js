import mongoose from "mongoose";

const warrantySchema = new mongoose.Schema({
    truckNo: { type: String, required: true },       // Associated truck number
    partName: { type: String, required: true },      // Name of the part under warranty
    purchaseDate: { type: Date, required: true },    // Date of purchase
    warrantyPeriodMonths: { type: Number, required: true }, // Warranty duration in months
    expiryDate: { type: Date, required: true },      // Automatically calculated field
    status: { type: String, enum: ['Active', 'Expired'], default: 'Active' } // Warranty status
});

// Middleware to auto-calculate expiry date based on purchase date and warranty period
warrantySchema.pre('save', function (next) {
    const expiryDate = new Date(this.purchaseDate);
    expiryDate.setMonth(expiryDate.getMonth() + this.warrantyPeriodMonths);
    this.expiryDate = expiryDate;

    // Auto-update status based on expiry date
    this.status = expiryDate > new Date() ? 'Active' : 'Expired';

    next();
});

// Optional index to optimize search
warrantySchema.index({ truckNo: 1, partName: 1 }, { unique: true });

const Warranty = mongoose.model('Warranty', warrantySchema);

export default Warranty;
