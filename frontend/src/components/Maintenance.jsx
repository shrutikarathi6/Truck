import { useState, useEffect } from "react";
import axios from "axios";
import "./All.css";


const Maintenance = () => {
  const [formData, setFormData] = useState({
    truckNo: "",
    date: "",
    category: "",
    subcategory: "",
    odoReading: "",
    warrantyType: "",
    warrantyValue: ""
  });

  const categoryOptions = {
    ACCESSORIES: ["Cover", "Horn", "Lights", "Wipers"],
    BATTERY: ["Battery A", "Battery B", "Battery C", "Battery D"],
    BEARING: ["Front Bearing", "Rear Bearing", "Wheel Bearing", "Engine Bearing"],
    BRAKE: ["Brake Pads", "Brake Fluid", "Brake Disc", "Brake Drum"],
    CLUTCH: ["Clutch Plate", "Clutch Cable", "Clutch Spring", "Clutch Cover"],
    CROWN: ["Crown Gear", "Crown Shaft", "Crown Nut", "Crown Cover"],
    ELECTRIC: ["Wiring", "Switches", "Lights", "Sensors"],
    ENGINE: ["Engine Oil", "Engine Filter", "Engine Valve", "Engine Pump"],
    "FUEL PUMP": ["Fuel Injector", "Fuel Pipe", "Fuel Valve", "Fuel Filter"],
    "GEAR BOX": ["Gear Lever", "Gear Shaft", "Gear Oil", "Gear Knob"],
    GREASING: ["Grease Gun", "Grease Pump", "Grease Hose", "Grease Nozzle"],
    HYDRAULIC: ["Hydraulic Oil", "Hydraulic Pump", "Hydraulic Cylinder", "Hydraulic Valve"],
    INSURANCE: ["Third Party", "Comprehensive", "Own Damage", "Theft"],
    PAINT: ["Primer", "Top Coat", "Base Coat", "Clear Coat"],
    PAPERS: ["RC Book", "Permit", "Insurance", "Pollution Certificate"],
    RADIATOR: ["Radiator Cap", "Radiator Fan", "Radiator Hose", "Radiator Coolant"],
    SUSPENSION: ["Shock Absorber", "Suspension Bush", "Suspension Arm", "Coil Spring"],
    TYRE: ["Front Tyre", "Rear Tyre", "Spare Tyre", "Tyre Tube"],
    UREA: ["Urea Pump", "Urea Injector", "Urea Filter", "Urea Sensor"],
    WELDING: ["Welding Rod", "Welding Torch", "Welding Helmet", "Welding Wire"],
  };

  // Fetch Odometer KM based on Truck Number & Date
  // useEffect(() => {
  //   if (formData.truckNo && formData.date) {
  //     axios
  //       .get(`http://localhost:5000/api/truck/${formData.truckNo}`)
  //       .then((res) => {
  //         const truckData = res.data;
  
  //         setFormData((prev) => ({
  //           ...prev,
  //           odoReading:
  //             truckData.lastUpdated === formData.date
  //               ? truckData.odoReading  
  //               : prev.odoReading,      
  //         }));
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // }, [formData.truckNo, formData.date]);
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const formattedDate = new Date(formData.date).toISOString(); 
      console.log(formData.subcategory)
      // await addMaintenance({truckNo,category,subcategory,date,odoReading,warrantyValue,warrantyType});
      const res = await axios.post("http://localhost:5000/api/maintenance/add", { 
        truckNo: formData.truckNo,
        date: formattedDate,
        category: formData.category,
        subcategory: formData.subcategory,
        odoReading: Number(formData.odoReading),
        warrantyType: formData.warrantyType,
        warrantyValue: formData.warrantyValue
    });
      alert("Maintenance Entry Added Successfully!");
      setFormData({
        truckNo: "",
        date: "",
        category: "",
        subcategory: "",
        odoReading: "",
        warrantyType: "",
        warrantyValue: ""
      });
    } catch (err) {
      console.error(err);
      alert("Error Adding Maintenance Entry");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "category" && { subcategory: "" }), // Reset subcategory if category changes
    }));
  };

  return (
    <div className="background">
      <div className="foreground">
        <h2 className="heading">Add Maintenance</h2>
        <form 
          onSubmit={handleSubmit} 
          style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px", margin: "auto" }}
        >
          <div className="input-container">
            <label className="input-label">Truck Number</label>
            <input
              type="text"
              name="truckNo"
              placeholder="Truck Number"
              className="input-field"
              onChange={handleChange}
              value={formData.truckNo}
            />
          </div>

          <div className="input-container">
            <label className="input-label">Date</label>
            <input
              type="date"
              name="date"
              className="input-field"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <label className="input-label">Category</label>
            <select name="category" className="input-field" value={formData.category} onChange={handleChange}>
              <option value="">Select Category</option>
              {Object.keys(categoryOptions).map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="input-container">
            <label className="input-label">Subcategory</label>
            <select 
              name="subcategory" 
              className="input-field" 
              value={formData.subcategory} 
              onChange={handleChange}
              disabled={!formData.category}
            >
              <option value="">Select Subcategory</option>
              {formData.category &&
                categoryOptions[formData.category].map((sub, index) => (
                  <option key={index} value={sub}>{sub}</option>
                ))}
            </select>
          </div>

          <div className="input-container">
            <label className="input-label">ODO KM</label>
            <input
              type="number"
              name="odoReading"
              className="input-field"
              onChange={handleChange}
              value={formData.odoReading}
            />
          </div>

          <div className="input-container">
            <label className="input-label">Warranty Type</label>
            <select name="warrantyType" className="input-field" value={formData.warrantyType} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="KM">KM</option>
              <option value="Year">Year</option>
            </select>
          </div>

          {formData.warrantyType && (
            <div className="input-container">
              <label className="input-label">{formData.warrantyType === "KM" ? "Enter KM Limit" : "Enter Years"}</label>
              <input
                type="number"
                name="warrantyValue"
                className="input-field"
                value={formData.warrantyValue}
                onChange={handleChange}
                placeholder={formData.warrantyType === "KM" ? "Enter KM Limit" : "Enter Years"}
              />
            </div>
          )}

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Maintenance;
