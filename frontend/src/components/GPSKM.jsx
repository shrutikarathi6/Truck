import { useState } from "react";
import { addGPSData } from "../api";
import "./All.css";



const GPSKM = () => {
  const [truckNo, setTruckNo] = useState("");
  const [date, setDate] = useState("");
  const [kmTravelled, setKmTravelled] = useState("");

  
  const [formData, setFormData] = useState({

    truckNo:"",date:"",kmTravelled:""


  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addGPSData({ truckNo, date, kmTravelled });
      alert("GPS KM updated!");
      setTruckNo("");
      setDate("");
      setKmTravelled("");
    } catch (error) {
      console.error(error);
      alert("Failed to update GPS KM");
    }
  };

  


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

  };


  return (
    <div className="background">
        <div className="foreground">
    <div>
    
      <h2>Update GPS KM</h2>
      <form onSubmit={handleSubmit}>

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
                  <label className="input-label">KM travelled</label>
                  <input
                    type="text"
                    name="kmTravelled"
                    placeholder="Km Travelled "
                    className="input-field"
                    onChange={handleChange}
                    value={formData.kmTravelled}
                   
                  />
                </div>
       
        
       
        <button type="submit" className="submit-button">Update GPS</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default GPSKM;
