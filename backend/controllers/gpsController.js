import GPS from '../models/GPSData.js';
import Truck from '../models/Truck.js';
import Maintenance from "../models/Maintenance.js"

// Add GPS Entry
export const addGPSData = async (req, res) => {
    const { truckNo, date, kmTravelled } = req.body;

    try {
        const truck = await Truck.findOne({ truckNo });
        if (!truck) return res.status(404).json({ message: 'Truck not found' });

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
