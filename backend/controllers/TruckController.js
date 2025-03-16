import Truck from "../models/Truck.js";

// Add a Truck
export const addTruck = async (req, res) => {
    const { truckNo, odoReading } = req.body;

    try {
        // Check if truck already exists
        const existingTruck = await Truck.findOne({ truckNo });
        if (existingTruck) {
            return res.status(400).json({ error: "Truck already exists" });
        }

        // Create new truck entry
        const newTruck = new Truck({
            truckNo,
            odoReading: odoReading || 0, // Default odoReading to 0 if not provided
            lastUpdated: new Date()
        });

        await newTruck.save();
        res.status(201).json({ message: "Truck added successfully", data: newTruck });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
