import { useState } from "react";
import { addTruck } from "../api";
import "./All.css";




const AddTruck = () => {
  const [truckNo, setTruckNo] = useState("");
  const [odoReading, setOdoReading] = useState("");

  const [formData, setFormData] = useState({

    truckNo:"",odoReading:""


  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTruck({ truckNo, odoReading });
      alert("Truck added successfully!");
      setTruckNo("");
      setOdoReading("");
    } catch (error) {
      console.error(error);
      alert("Failed to add truck");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

  };

  return (
    
    <div>
        <div className="background">
        <div className="foreground">
       
       
      <h2>Add Truck</h2>
      <form onSubmit={handleSubmit}>

     
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
                    placeholder="Odo Km "
                    className="input-field"
                    onChange={handleChange}
                    value={formData.odoReading}
                   
                  />
                </div>


        
       
       
        <button type="submit" className="submit-button">Add Truck</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default AddTruck;
