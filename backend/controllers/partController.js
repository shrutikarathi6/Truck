import Part from "../models/Part.js";
import GPS from "../models/GPSData.js";

// Add Part Entry
export const addPart = async (req, res) => {
    const { partNo, type, purchaseDate, vehicleDetails } = req.body;

    try {
        const newPart = new Part({
            partNo,
            type,
            purchaseDate,
            vehicleDetails,
            status: "Active",
            history: [{
                action: "Added",
                details: `Part added to ${vehicleDetails}`,
                date: new Date()
            }]
        });

        // Correctly assign the saved data to `savedPart`
        const savedPart = await newPart.save();

        // Send the saved data in the response
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
    const { partNumber } = req.params;

    try {
        const part = await Part.findOne({ partNo: partNumber });
        if (!part) return res.status(404).json({ message: "Part not found." });

        res.status(200).json({ history: part.history });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve part history.", error: error.message });
    }
};

// Update Part to Stock with Details
export const updatePartToStock = async (req, res) => {
    const { partNumber } = req.params;
    const { details } = req.body;

    try {
        const part = await Part.findOne({ partNo: partNumber });
        if (!part) return res.status(404).json({ message: "Part not found." });

        part.status = "Stock";
        part.history.push({
            action: "Moved to Stock",
            details,
            date: new Date()
        });

        await part.save();
        res.status(200).json({ message: "Part moved to stock successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to update part to stock.", error: error.message });
    }
};

// Mark Part as Scrap
export const markPartAsScrap = async (req, res) => {
    const { partNumber } = req.params;

    try {
        const part = await Part.findOne({ partNo: partNumber });
        if (!part) return res.status(404).json({ message: "Part not found." });

        part.status = "Scrap";
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
