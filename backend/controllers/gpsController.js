import GPS from '../models/GPSData.js';
import Truck from '../models/Truck.js';
import Maintenance from "../models/Maintenance.js"

// Add GPS Entry
export const addGPSData = async (req, res) => {
    const { truckNo, date, kmTravelled } = req.body;

    try {
        const truck = await Truck.findOne({ truckNo });

        if (!truck) {
            return res.status(400).json({ error: "Truck number is not found required" });
        }
        
        truck.odoReading = Number(truck.odoReading);
        truck.odoReading += Number(kmTravelled);
        truck.lastUpdated = date;
        const newOdometer=truck.odoReading;
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
        const maintenance = await Maintenance.find({ truckNo }).sort({date:1});

        res.status(200).json({
            gpsHistory: history,
            maintenanceHistory:maintenance
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
