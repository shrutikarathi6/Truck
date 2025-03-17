import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  // ✅ Added for frontend communication
import connectDB from './config/db.js';
import gpsRoutes from './routes/gpsRoutes.js';
import maintenanceRoutes from './routes/maintenanceRoutes.js';
import partRoutes from './routes/partRoutes.js';
import truckRoutes from "./routes/truckRoutes.js"
import Truck from './models/Truck.js';

dotenv.config();
connectDB();

const dropTruckIndex = async () => {
    try {
        await Truck.collection.dropIndex("truckNumber_1");
        console.log("Dropped unique index on truckNo successfully!");
    } catch (error) {
        console.log("Index not found or already removed:", error.message);
    }
};

dropTruckIndex();

const app = express();

// ✅ Middleware
app.use(cors()); // Allow requests from different origins
app.use(express.json());

// ✅ Routes
app.use('/api/gps', gpsRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/part', partRoutes);
app.use('/api/trucks', truckRoutes);

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
});

// ✅ Port Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
