import GPS from '../models/GPSData.js';
import Truck from '../models/Truck.js';
import Maintenance from "../models/Maintenance.js"

// Add GPS Entry
export const addGPSData = async (req, res) => {
    const { truckNo, date, kmTravelled } = req.body;

    try {
        let truck = await Truck.findOne({ truckNo });

        // ✅ If truck doesn't exist, create a new one with odoReading = 0
        if (!truck) {
            truck = new Truck({ truckNo, odoReading: 0 });
            await truck.save(); // Save the new truck
        }

        // ✅ Ensure odoReading is set (default to 0)
        truck.odoReading = truck.odoReading || 0;

        const newOdometer = truck.odoReading + kmTravelled;

        const newGPS = new GPS({
            truckNo,
            date,
            kmTravelled
        });

        await newGPS.save();
        truck.odoReading = newOdometer;
        await truck.save();

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
