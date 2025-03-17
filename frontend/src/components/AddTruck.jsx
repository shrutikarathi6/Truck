import { useState } from "react";
import axios from "axios";
import "./All.css";

const AddTruck = () => {
    const [formData, setFormData] = useState({
        truckNo: "", 
        odoReading: ""
    });

    const [searchTruckNo, setSearchTruckNo] = useState("");
    const [truckHistory, setTruckHistory] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.truckNo.trim()) {
            alert("Truck number is required!");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/trucks/add", { 
                truckNo: formData.truckNo, 
                odoReading: formData.odoReading
            });

            alert("Truck added successfully!");
            setFormData({ truckNo: "", odoReading: "" });
            console.log(res.data);
        } catch (error) {
            console.error(error.response?.data || error.message);
            alert(error.response?.data?.error || "Failed to add truck");
        }
    };

    const handleSearch = async () => {
        if (!searchTruckNo.trim()) {
            alert("Please enter a Truck Number to search.");
            return;
        }

        try {
            const res = await axios.get(`http://localhost:5000/api/gps/history/${searchTruckNo}`);

            // Merge GPS and Maintenance history & sort by date
            const mergedHistory = [
                ...res.data.gpsHistory.map(entry => ({ ...entry, type: "GPS" })),
                ...res.data.maintenanceHistory.map(entry => ({ ...entry, type: "Maintenance" }))
            ].sort((a, b) => new Date(a.date || a.installationDate) - new Date(b.date || b.installationDate));

            setTruckHistory(mergedHistory);
        } catch (error) {
            console.error("Error fetching history:", error);
            alert("Failed to retrieve truck history.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "odoReading" ? Number(value) || 0 : value
        }));
    };

    return (
        <div className="background">
            <div className="divide">
                {/* ADD TRUCK SECTION */}
                <div className="foreground1">
                    <h2 className="heading">Add Truck</h2>
                    <form 
                        onSubmit={handleSubmit} 
                        style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px", marginLeft: "auto",marginRight:"auto" }}
                    >
                        <div className="input-container">
                            <label className="input-label">Truck No</label>
                            <input
                                type="text"
                                name="truckNo"
                                placeholder="Enter Truck No"
                                className="input-field"
                                onChange={handleChange}
                                value={formData.truckNo}
                            />
                        </div>
                        <div className="input-container">
                            <label className="input-label">ODO KM</label>
                            <input
                                type="number"
                                name="odoReading"
                                placeholder="Odo Km"
                                className="input-field"
                                onChange={handleChange}
                                value={formData.odoReading}
                            />
                        </div>
                        <button type="submit" className="submit-button">Add Truck</button>
                    </form>
                </div>

                {/* SEARCH TRUCK HISTORY SECTION */}
                <div className="foreground1">
                    <h2>Search Truck History</h2>
                    <div className="input-container">
                    <label className="input-label">Truck No</label>
                        <input 
                            type="text"
                            placeholder="Enter Truck No"
                            className="input-field"
                            value={searchTruckNo}
                            onChange={(e) => setSearchTruckNo(e.target.value)}
                        />
                        
                    </div>
                    <button 
                            className="submit-button" 
                            onClick={handleSearch}
                        >
                            Search
                        </button>

                    {truckHistory.length > 0 && (
                        <div 
                            className="history-container" 
                            style={{
                                maxHeight: "300px",  
                                overflowY: "auto", 
                                border: "1px solid #ccc",
                                padding: "10px",
                                borderRadius: "5px",
                                marginTop: "10px"
                            }}
                        >
                            <h3>Truck History</h3>
                            {truckHistory.map((entry, index) => (
                                <div 
                                    key={index} 
                                    className="history-item"
                                    style={{ 
                                        backgroundColor: index % 2 === 0 ? "#adb5bd" : "#8ecae6",
                                        padding: "10px",
                                        marginBottom: "5px",
                                        borderRadius: "5px",
                                        width:"90%"
                                    }}
                                >
                                    {entry.type === "GPS" ? (
                                        <>
                                            <p><strong>Action:</strong> GPS Update</p>
                                            <p><strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}</p>
                                            <p><strong>KM Travelled:</strong> {entry.kmTravelled}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p><strong>Action:</strong> Maintenance</p>
                                            <p><strong>Date:</strong> {new Date(entry.installationDate).toLocaleDateString()}</p>
                                            <p><strong>Category:</strong> {entry.category}</p>
                                            <p><strong>Subcategory:</strong> {entry.subcategory}</p>
                                            <p><strong>OdoReading at the time:</strong> {entry.odoReading}</p>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddTruck;
