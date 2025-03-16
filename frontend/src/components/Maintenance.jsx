import { useState, useEffect } from "react";
import axios from "axios";
import "./All.css";



const Maintenance = () => {
  const [truckNo, setTruckNo] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [warrantyType, setWarrantyType] = useState("KM");
  const [warrantyValue, setWarrantyValue] = useState("");
  const [odoKM, setOdoKM] = useState("");

  const [formData, setFormData] = useState({

          truckNo:"",date:"",category:"",subcategory:"",odoReading:""


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
  useEffect(() => {
    if (truckNo && date) {
      axios
        .get(`http://localhost:5000/api/gps/history/${truckNo}`)
        .then((res) => {
          const data = res.data;
          const selectedEntry = data.find((entry) => entry.date === date);
          setOdoKM(selectedEntry ? selectedEntry.kmTravelled : "No Data");
        })
        .catch((err) => console.error(err));
    }
  }, [truckNo, date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const maintenanceData = { truckNo, date, category, subCategory, warrantyType, warrantyValue, odoKM };
    try {
      await axios.post("http://localhost:5000/api/maintenance/add", maintenanceData);
      alert("Maintenance Entry Added Successfully!");
      setTruckNo("");
      setDate("");
      setCategory("");
      setSubCategory("");
      setWarrantyType("KM");
      setWarrantyValue("");
      setOdoKM("");
    } catch (err) {
      console.error(err);
      alert("Error Adding Maintenance Entry");
    }
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setFormData({
        ...formData,
        category: value,
        subcategory: "",
      });
    }
    else{

    setFormData({ ...formData, [name]: value });

    
  }
    
  };

  return (
    <div className="background">
        <div className="foreground">
    <div style={{ textAlign: "center", marginTop: "50px" }}>
        
      <h2>Add Maintenance</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px", margin: "auto" }}>

      <div className="input-container">
                  <label className="input-label">Truck Number</label>
                  <input
                    type="text"
                    name="truckNo"
                    placeholder="Truck Number "
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
                    placeholder="Enter date"
                    className="input-field"
                    value={formData.date}
                    onChange={handleChange}
                   

                  />
                </div>

                <div className="input-container">
        <label className="input-label">Category</label>
        <select
          name="category"
          className="input-field"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {Object.keys(categoryOptions).map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>





                {/* Subcategory*/}
                <div className="input-container">
        <label className="input-label">Subcategory</label>
        <select
          name="subcategory"
          className="input-field1"
          value={formData.subcategory}
          onChange={handleChange}
          disabled={!formData.category}
        >
          <option value="">Select Subcategory</option>
          {formData.category &&
            categoryOptions[formData.category].map((sub, index) => (
              <option key={index} value={sub}>
                {sub}
              </option>
            ))}
        </select>
      </div>

      <div className="input-container">
                  <label className="input-label">ODO KM</label>
                  <input
                    type="number"
                    name="odoReading"
                    placeholder="Odo Km "
                    className="input-field"
                    onChange={handleChange}
                    value={formData.odoReading}
                   
                  />
                </div>

        
        
        
       
        {/* Warranty Type Dropdown */}
        <select value={warrantyType} onChange={(e) => setWarrantyType(e.target.value)}>
          <option value="KM">KM</option>
          <option value="Year">Year</option>
        </select>

        {/* Warranty Value Input */}
        <input type="number" placeholder={warrantyType === "KM" ? "Enter KM Limit" : "Enter Years"} value={warrantyValue} onChange={(e) => setWarrantyValue(e.target.value)} required />

       

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default Maintenance;
