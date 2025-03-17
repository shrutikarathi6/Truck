import { useState } from "react";
import axios from "axios";

const Part = () => {
  const [formData, setFormData] = useState({
    partNo: "",
    type: "",
    purchaseDate: "",
    installedAt: "",
    newvehicleno: "",
  });

  const [searchPartNo, setSearchPartNo] = useState("");
  const [partHistory, setPartHistory] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let response;
      const formattedDate = new Date(formData.purchaseDate).toISOString(); 
  
      if (formData.installedAt === "Stock") {
        response = await axios.put(`http://localhost:5000/api/part/stock/${formData.partNo}`, {
          purchaseDate: formattedDate
        });
      } else if (formData.installedAt === "Scrap") {
        response = await axios.put(`http://localhost:5000/api/part/scrap/${formData.partNo}`, {
          purchaseDate: formattedDate
        });
      } else if (formData.installedAt === "Truck" && formData.newvehicleno) {
        response = await axios.put(`http://localhost:5000/api/part/assign/${formData.partNo}`, {
          newTruckNumber: formData.newvehicleno,
          type: formData.type,
          purchaseDate: formattedDate
        });
      } else {
        alert("Invalid selection. Please check your input.");
        return;
      }
  
      alert(response.data.message);
      setFormData({
        partNo: "",
        type: "",
        purchaseDate: "",
        installedAt: "",
        newvehicleno: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to process request.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchPartNo(e.target.value);
  };

  const fetchHistory = async () => {
    if (!searchPartNo.trim()) {
      setError("Please enter a Part Number");
      return;
    }

    try {
      setError("");
      const response = await axios.get(`http://localhost:5000/api/part/history/${searchPartNo}`);
      setPartHistory(response.data.history || []);
    } catch (error) {
      setPartHistory([]);
      setError("Part not found or error retrieving history.");
    }
  };

  return (
    <div className="background">
      <div className="divide">
        <div className="foreground1">
          <h2 className="heading">Add Part</h2>
          <form 
            onSubmit={handleSubmit} 
            style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px", margin: "auto" }}
          >
            <div className="input-container">
              <label className="input-label">Part Number</label>
              <input
                type="text"
                name="partNo"
                placeholder="Part Number"
                className="input-field"
                onChange={handleChange}
                value={formData.partNo}
                required
              />
            </div>

            <div className="input-container">
              <label className="input-label">Type</label>
              <input
                type="text"
                name="type"
                placeholder="Type"
                className="input-field"
                onChange={handleChange}
                value={formData.type}
                required
              />
            </div>

            <div className="input-container">
              <label className="input-label">Date</label>
              <input
                type="date"
                name="purchaseDate"
                placeholder="Enter date"
                className="input-field"
                value={formData.purchaseDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-container">
              <label className="input-label">Actions</label>
              <select 
                name="installedAt"
                value={formData.installedAt} 
                onChange={handleChange} 
                required
              >
                <option value="">Select Installed Location</option>
                <option value="Stock">Stock</option>
                <option value="Scrap">Scrap</option>
                <option value="Truck">Truck (Enter Truck No Below)</option>
              </select>
            </div>

            {formData.installedAt === "Truck" && (
              <div className="input-container">
                <label className="input-label">Vehicle No</label>
                <input
                  type="text"
                  name="newvehicleno"
                  placeholder="Enter vehicle no"
                  className="input-field"
                  value={formData.newvehicleno}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <button type="submit" className="submit-button">Add Part</button>
          </form>
        </div>

        <div className="foreground1">
          <h2>Search Parts</h2>
          <div className="input-container">
            <label className="input-label">Search Part Number</label>
            <input
             
              type="text"
              placeholder="Enter Part Number"
              className="input-field"
              value={searchPartNo}
              onChange={handleSearchChange}
            />
          </div>

          <button onClick={fetchHistory} className="submit-button">Search</button>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {partHistory.length > 0 && (
  <div 
    className="history-container" 
    style={{
      maxHeight: "300px",  // Adjust height as needed
      overflowY: "auto", 
      border: "1px solid #ccc",
      padding: "10px",
      borderRadius: "5px",
      width:"90%"
    }}
  >
    <h3>Part History</h3>
    {partHistory.map((entry, index) => (
      <div 
        key={index} 
        className="history-item"
        style={{ 
          backgroundColor: index % 2 === 0 ? "#adb5bd" : "#8ecae6",
          padding: "10px",
          marginBottom: "5px",
          borderRadius: "5px"
        }}
      >
        <p><strong>Action:</strong> {entry.action}</p>
        <p><strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}</p>
      </div>
    ))}
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default Part;
