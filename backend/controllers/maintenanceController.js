import Maintenance from "../models/Maintenance.js";
import Warranty from "../models/Warranty.js";
import GPS from "../models/GPSData.js";
import Truck from "../models/Truck.js"

// Add Maintenance Entry
export const addMaintenance = async (req, res) => {
    const { truckNo, category, subcategory, installationDate,initialodoreading, odoReading, warrantyPeriod, warrantyType } = req.body;
    const uniqueId = `${truckNo}_${installationDate}_${category}`;
    try {
        const newMaintenance = new Maintenance({
            truckNo,
            category,
            subcategory,
            installationDate,
            initialodoreading,
            odoReading,
            warrantyPeriod,
            warrantyType,
            uniqueId

        });
        await newMaintenance.save();
        

        if (warrantyType === "Time") {
            expiry = new Date(installationDate);
            expiry.setDate(expiry.getDate() + (warrantyPeriod * 365));  // ✅ Fix: Correct calculation
        } else if (warrantyType === "KM") {
            expiry = warrantyPeriod;  // ✅ Fix: Use correct variable
        }
        

        const newWarranty = new Warranty({
            uniqueId,
            warrantyType, // 'km' or 'time'
            expiry
        });
        await newWarranty.save();

        res.status(201).json({ message: "Maintenance entry added successfully" });
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
            const { uniqueId, warrantyType, expiry } = warranty;
            const maintenance = await Maintenance.findOne({ uniqueId });  // ✅ Fix: Correct query
            if (!maintenance) return res.status(404).json({ message: "Maintenance record not found." });

            const { installationDate, truckNo, initialodoreading } = maintenance;
            const truck = await Truck.findOne({ truckNo });  // ✅ Fix: Correct query
            if (!truck) return res.status(404).json({ message: "Truck not found." });

            const odoreading = truck.odoReading;


            let totalKM = 0;
            totalKM = odoreading-initialodoreading;

            if ((warrantyType === 'km' && totalKM >= expiry) ||
                (warrantyType === 'time' && expiry===today)) {
                notifications.push({ truckNo, message: `Warranty period expired for category installed on ${installationDate}` });
            }
        }

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
