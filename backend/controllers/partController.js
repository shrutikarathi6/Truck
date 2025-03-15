import Part from "../models/Part.js";

// Add Part Entry
export const addPart = async (req, res) => {
    const { partNo, type, purchaseDate, vehicleDetails } = req.body;

    try {
        const newPart = new Part({
            partNo,
            type,
            purchaseDate,
            vehicleDetails,
            history: [{
                action: "Added",
                date: new Date(),
            }]
        });

        const savedPart = await newPart.save();

        res.status(201).json({ 
            message: "Part added successfully.", 
            data: savedPart 
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Failed to add part.", 
            error: error.message 
        });
    }
};


// Get Part History
export const getPartHistory = async (req, res) => {
    const { partNo } = req.params;

    try {
        const part = await Part.findOne({ partNo });
        if (!part) return res.status(404).json({ message: "Part not found." });

        res.status(200).json({ history: part.history });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve part history.", error: error.message });
    }
};
// Update Part to Stock with Details
export const updatePartToStock = async (req, res) => {
    const { partNo } = req.params;
    

    try {
        const part = await Part.findOne({ partNo });
        if (!part) return res.status(404).json({ message: "Part not found." });

        part.vehicleDetails="Stock"
        part.history.push({
            action: "Moved to Stock",
            date: new Date()
        });

        await part.save();
        res.status(200).json({ message: "Part moved to stock successfully." });
    } catch (error) {
        console.error("Error in updatePartToStock:", error);  
        res.status(500).json({ message: "Failed to update part to stock.", error: error.message });
    }
};

// Assign Part to Another Truck
export const assignPartToTruck = async (req, res) => {
    const { partNo } = req.params;
    const { newTruckNumber } = req.body;

    try {
        const part = await Part.findOne({ partNo });
        if (!part) return res.status(404).json({ message: "Part not found." });

        part.vehicleDetails = newTruckNumber;

        const truck = await Truck.findOne({ truckNo: newTruckNumber });
        if (!truck) return res.status(404).json({ message: "Truck not found." });
        
        const odokm = truck.odoReading;

        part.status = "Active";
        part.history.push({
            action: `Assigned to Truck ${newTruckNumber} having odoreading ${odokm}`,
            date: new Date(),
        });

        await part.save();
        res.status(200).json({ message: "Part assigned to truck successfully.", data: part });
    } catch (error) {
        res.status(500).json({ message: "Failed to assign part to truck.", error: error.message });
    }
};

// Mark Part as Scrap
export const markPartAsScrap = async (req, res) => {
    const { partNo } = req.params;

    try {
        const part = await Part.findOne({ partNo });
        if (!part) return res.status(404).json({ message: "Part not found." });

        part.vehicleDetails = "Scrap";
        part.history.push({
            action: "Scrapped",
            date: new Date()
        });

        await part.save();
        res.status(200).json({ message: "Part marked as scrap successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to mark part as scrap.", error: error.message });
    }
};