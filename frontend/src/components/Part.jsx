import { useState } from "react";
import axios from "axios";
import "./All.css";

const Part = () => {
  const [partNo, setPartNo] = useState("");
  const [type, setType] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [installedAt, setInstalledAt] = useState("");

  const [formData, setFormData] = useState({

    partNo:"",type:"",date:""


  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/part/add", { partNo, type, purchaseDate, installedAt });
      alert("Part added successfully!");
      setPartNo("");
      setType("");
      setPurchaseDate("");
      setInstalledAt("");
    } catch (error) {
      console.error(error);
      alert("Failed to add part");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

  };

  return (
    <div className="background">
        <div className="foreground">
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Add Part</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px", margin: "auto" }}>

      <div className="input-container">
                  <label className="input-label">Part Number</label>
                  <input
                    type="text"
                    name="partNo"
                    placeholder="Part Number "
                    className="input-field"
                    onChange={handleChange}
                    value={formData.partNo}
                   
                  />
                </div>

                <div className="input-container">
                  <label className="input-label">Type</label>
                  <input
                    type="text"
                    name="type"
                    placeholder="Type "
                    className="input-field"
                    onChange={handleChange}
                    value={formData.type}
                   
                  />
                </div>

                <div className="input-container">
                  <label className="input-label">Date</label>
                  <input
                    type="date"
                    name="date"
                    placeholder="Enter date"
                    className="input-field"
                    value={formData.date}
                    onChange={handleChange}
                   

                  />
                </div>

       
       
        

        {/* Installed At Dropdown */}
        <select value={installedAt} onChange={(e) => setInstalledAt(e.target.value)} required>
          <option value="">Select Installed Location</option>
          <option value="Stock">Stock</option>
          <option value="Scrap">Scrap</option>
          <option value="Truck">Truck (Enter Truck No Below)</option>
        </select>

        {/* Truck Number Field (Only if Truck is Selected) */}
        {installedAt === "Truck" && (
          <input type="text" placeholder="Enter Truck Number" onChange={(e) => setInstalledAt(e.target.value)} required />
        )}

       <button type="submit" className="submit-button">Add Part</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default Part;
