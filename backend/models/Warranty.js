import mongoose from "mongoose";

const warrantySchema = new mongoose.Schema({
    // uniqueId: { 
    //     type: String, 
    //     unique: true, 
    //     required: true, 
    //     index: true  // Ensures faster lookups
    // },
    warrantyType: { 
        type: String, 
        enum: ["Time", "KM"], 
        required: true 
    },
    // expiry: { 
    //     type: mongoose.Schema.Types.Mixed, 
    //     required: false,   // Optional in case expiry calculation fails
    //     default: null      // Ensures undefined expiry doesn't break logic
    // }
}, { timestamps: true });  // Tracks createdAt and updatedAt

const Warranty = mongoose.model("Warranty", warrantySchema);

export default Warranty;
