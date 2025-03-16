import Maintenance from "../models/Maintenance.js";
import Warranty from "../models/Warranty.js";
import Truck from "../models/Truck.js"

// Add Maintenance Entry
export const addMaintenance = async (req, res) => {
    const { truckNo, category, subcategory, installationDate, initialodoreading, odoReading, warrantyPeriod, warrantyType } = req.body;

    try {
        // 🚀 Validate truckNo
        if (!truckNo) return res.status(400).json({ error: "Truck number is required" });

        // ✅ Ensure uniqueId is correctly generated
        const uniqueId = `${truckNo}_${installationDate}_${category}`;
        console.log(uniqueId)
        let expiry = null;
        if (warrantyType === "Time") {
            expiry = new Date(installationDate);
            expiry.setDate(expiry.getDate() + (warrantyPeriod * 30));  // 30 days per month
        } else if (warrantyType === "KM") {
            expiry = odoReading + warrantyPeriod;  // ✅ Fix: Odometer-based expiry
        }
        // 🔥 Create Maintenance Entry
        const newMaintenance = new Maintenance({
            truckNo,
            category,
            subcategory,
            installationDate,
            initialodoreading,
            odoReading,
            warrantyPeriod,
            warrantyType,
            uniqueId,
            expiry
        });

        await newMaintenance.save();

        
    
        // const newWarranty = new Warranty({
            
        //     warrantyType,
            
        // });

        // await newWarranty.save();

        res.status(201).json({ message: "Maintenance entry added successfully", uniqueId, expiry });

    } catch (error) {
        console.error("Error in addMaintenance:", error); // ✅ Debugging Log
        res.status(500).json({ error: error.message });
    }
};




// Get Notifications
export const getNotifications = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

        const warranties = await Maintenance.find();
        const notifications = [];

        for (const warranty of warranties) {
            // const { uniqueId, warrantyType, expiry } = warranty;
            // const maintenance = await Maintenance.findOne({ uniqueId });  // ✅ Fix: Correct query
            // if (!maintenance) return res.status(404).json({ message: "Maintenance record not found." });

            const { installationDate, truckNo,warrantyType, initialodoreading,expiry } = warranty;
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
