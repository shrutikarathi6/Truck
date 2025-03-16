import GPS from '../models/GPSData.js';
import Truck from '../models/Truck.js';
import Maintenance from "../models/Maintenance.js"

// Add GPS Entry
export const addGPSData = async (req, res) => {
    const { truckNo, date, kmTravelled } = req.body;

    try {
        const truck = await Truck.find({ truckNo });

        

        // ✅ If truck doesn't exist, create a new one with odoReading = 0
        if (!truck) {
            return res.status(400).json({ error: "Truck number is not found required" });
        }
        
        truck.odoReading = truck.odoReading || 0;
        const newOdometer = truck.odoReading + kmTravelled;
        truck.odoReading = newOdometer;
        truck.lastUpdated =date;
        await truck.save();

        const newGps=new GPS({
            truckNo,
            date,
            kmTravelled
        });

        await newGps.save();
        
        res.status(201).json({ message: 'GPS Data Added', newOdometer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Truck History
export const getTruckHistory = async (req, res) => {
    const { truckNo } = req.params;

    try {
        const history = await GPS.find({ truckNo }).sort({ date: 1 });
        const maintenanceHistory = await Maintenance.find({ truckNo });

        res.status(200).json({
            gpsHistory: history,
            maintenanceHistory
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
