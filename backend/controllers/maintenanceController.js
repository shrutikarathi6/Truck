import Maintenance from "../models/Maintenance.js";
import Warranty from "../models/Warranty.js";
import GPS from "../models/GPSData.js";

// Add Maintenance Entry
export const addMaintenance = async (req, res) => {
    const { truckNo, category, subcategory, installationDate, odoKM, warrantyType, warrantyValue } = req.body;

    try {
        const newMaintenance = new Maintenance({
            truckNo,
            category,
            subcategory,
            installationDate,
            odoKM
        });
        await newMaintenance.save();

        const uniqueId = `${truckNo}_${installationDate}_${category}`;
        const newWarranty = new Warranty({
            uniqueId,
            warrantyType, // 'km' or 'time'
            warrantyValue
        });
        await newWarranty.save();

        res.status(201).json({ message: "Maintenance entry added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Maintenance History for a Truck
export const getMaintenanceHistory = async (req, res) => {
    const { truckNo } = req.params;

    try {
        const maintenanceHistory = await Maintenance.find({ truckNo });
        res.status(200).json(maintenanceHistory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Notifications
export const getNotifications = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

        const warranties = await Warranty.find();
        const notifications = [];

        for (const warranty of warranties) {
            const { uniqueId, warrantyType, warrantyValue } = warranty;
            const [truckNo, installationDate] = uniqueId.split('_');
            const gpsEntries = await GPS.find({ truckNo });

            let totalKM = 0;
            gpsEntries.forEach(entry => {
                if (new Date(entry.date) >= new Date(installationDate)) {
                    totalKM += entry.km;
                }
            });

            if ((warrantyType === 'km' && totalKM >= warrantyValue) ||
                (warrantyType === 'time' && new Date(installationDate).setDate(new Date(installationDate).getDate() + warrantyValue) <= new Date(today))) {
                notifications.push({ truckNo, message: `Warranty period expired for category installed on ${installationDate}` });
            }
        }

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
