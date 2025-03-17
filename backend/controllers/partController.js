import Part from "../models/Part.js";
import Truck from "../models/Truck.js";

// Assign or Add Part to a Truck
export const assignOrAddPart = async (req, res) => {
    const { partNo } = req.params;
    const { newTruckNumber, type, purchaseDate } = req.body;

    try {
        let part = await Part.findOne({ partNo });

        if (!part) {
            // ✅ If part does not exist, create a new part and assign it
            part = new Part({
                partNo,
                type,
                purchaseDate, // Store input date
                vehicleDetails: newTruckNumber,
                history: [{
                    action: `Added & Assigned to Truck ${newTruckNumber}`,
                    date: purchaseDate || new Date(),
                }]
            });

        } else {
            // ✅ If part exists, update its vehicleDetails and history
            const truck = await Truck.findOne({ truckNo: newTruckNumber });
            if (!truck) return res.status(404).json({ message: "Truck not found." });

            const odokm = truck.odoReading;

            part.vehicleDetails = newTruckNumber;
            part.purchaseDate = purchaseDate || part.purchaseDate; // Store the assigned date
            part.history.push({
                action: `Assigned to Truck ${newTruckNumber} (OdoReading: ${odokm})`,
                date: purchaseDate || new Date(),
            });
        }

        await part.save();
        res.status(200).json({ message: "Part successfully assigned to truck.", data: part });

    } catch (error) {
        res.status(500).json({ message: "Failed to assign or add part.", error: error.message });
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
    const { purchaseDate } = req.body; // Get purchaseDate from request

    try {
        const part = await Part.findOne({ partNo });
        if (!part) return res.status(404).json({ message: "Part not found." });

        part.vehicleDetails = "Stock";
        part.purchaseDate = purchaseDate || part.purchaseDate; // Ensure date is stored
        part.history.push({
            action: "Moved to Stock",
            date: purchaseDate || new Date() // Store input date or current date
        });

        await part.save();
        res.status(200).json({ message: "Part moved to stock successfully." });
    } catch (error) {
        console.error("Error in updatePartToStock:", error);
        res.status(500).json({ message: "Failed to update part to stock.", error: error.message });
    }
};


// // Assign Part to Another Truck
// export const assignPartToTruck = async (req, res) => {
//     const { partNo } = req.params;
//     const { newTruckNumber } = req.body;

//     try {
//         const part = await Part.findOne({ partNo });
//         if (!part) return res.status(404).json({ message: "Part not found." });

//         part.vehicleDetails = newTruckNumber;

//         const truck = await Truck.findOne({ truckNo: newTruckNumber });
//         if (!truck) return res.status(404).json({ message: "Truck not found." });
        
//         const odokm = truck.odoReading;

//         part.status = "Active";
//         part.history.push({
//             action: `Assigned to Truck ${newTruckNumber} having odoreading ${odokm}`,
//             date: new Date(),
//         });

//         await part.save();
//         res.status(200).json({ message: "Part assigned to truck successfully.", data: part });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to assign part to truck.", error: error.message });
//     }
// };

// Mark Part as Scrap
export const markPartAsScrap = async (req, res) => {
    const { partNo } = req.params;
    const { purchaseDate } = req.body; // Get purchaseDate from request

    try {
        const part = await Part.findOne({ partNo });
        if (!part) return res.status(404).json({ message: "Part not found." });

        part.vehicleDetails = "Scrap";
        part.purchaseDate = purchaseDate || part.purchaseDate; // Store date
        part.history.push({
            action: "Scrapped",
            date: purchaseDate || new Date()
        });

        await part.save();
        res.status(200).json({ message: "Part marked as scrap successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to mark part as scrap.", error: error.message });
    }
};
