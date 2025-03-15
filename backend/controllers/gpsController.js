import GPS from '../models/GPSData.js';
import Truck from '../models/Truck.js';

// Add GPS Entry
export const addGPSData = async (req, res) => {
    const { truckNumber, date, kmTravelled } = req.body;

    try {
        const truck = await Truck.findOne({ truckNumber });
        if (!truck) return res.status(404).json({ message: 'Truck not found' });

        const newOdometer = truck.odo + kmTravelled;
        
        const newGPS = new GPS({
            truckNumber,
            date,
            kmTravelled
        });

        await newGPS.save();
        truck.odo = newOdometer;
        await truck.save();

        res.status(201).json({ message: 'GPS Data Added', newOdometer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Truck History
export const getTruckHistory = async (req, res) => {
    const { truckNumber } = req.params;

    try {
        const history = await GPS.find({ truckNumber }).sort({ date: 1 });
        const maintenanceHistory = await Maintenance.find({ truckNumber });

        res.status(200).json({
            gpsHistory: history,
            maintenanceHistory
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
