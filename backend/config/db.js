import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit on failure
    }
};

// Handle MongoDB connection issues after the initial connection
mongoose.connection.on("disconnected", () => {
    console.error("MongoDB disconnected! Retrying...");
    connectDB();  // Auto-reconnect
});

export default connectDB;
