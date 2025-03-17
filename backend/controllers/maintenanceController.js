import Maintenance from "../models/Maintenance.js";
import Warranty from "../models/Warranty.js";
import Truck from "../models/Truck.js"

// Add Maintenance Entry
export const addMaintenance = async (req, res) => {
    const { truckNo, category, subcategory, installationDate, odoReading, warrantyValue, warrantyType } = req.body;

    try {
        // 🚀 Validate truckNo
        if (!truckNo) return res.status(400).json({ error: "Truck number is required" });

        // ✅ Ensure uniqueId is correctly generated

        console.log(subcategory)
        const uniqueId = `${truckNo}_${installationDate}_${category}`;
        console.log(uniqueId)
        let expiry = null;
        if (warrantyType === "Time") {
            expiry = new Date(installationDate);
            expiry.setDate(expiry.getDate() + (warrantyValue * 30));  // 30 days per month
        } else if (warrantyType === "KM") {
            expiry = Number(odoReading) + Number(warrantyValue);  // ✅ Fix: Odometer-based expiry
        }
        
        const newMaintenance = new Maintenance({
            uniqueId,
            truckNo,
            category,
            subcategory,
            installationDate,
            odoReading,
            warrantyValue,
            warrantyType,
            expiry
        });

        await newMaintenance.save();


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


            const { installationDate,category,subcategory, truckNo,warrantyType,expiry } = warranty;
            const truck = await Truck.findOne({ truckNo });  // ✅ Fix: Correct query
            if (!truck) return res.status(404).json({ message: "Truck not found." });

            const odoReading = truck.odoReading;
            console.log(odoReading,expiry)

            if ((warrantyType === 'KM' && odoReading >= expiry) ||
                (warrantyType === 'Time' && expiry===today)) {
                    console.log(truckNo)
                notifications.push({ truckNo, message: `Alert category ${category} and ${subcategory}  on ${installationDate}` });
            }
        }

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};