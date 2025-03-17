import { useState } from "react";
import axios from "axios";
import "./All.css";



const GPSKM = () => {

  const [formData, setFormData] = useState({

    truckNo: "", date: "", kmTravelled: ""


  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(typeof formData.truckNo, typeof formData.date, typeof formData.kmTravelled);

        const formattedDate = new Date(formData.date).toISOString(); // ✅ Keep full timestamp

        const res = await axios.post("http://localhost:5000/api/gps/add-gps", { 
            truckNo: formData.truckNo, 
            date: formattedDate,  // ✅ Ensuring full date-time is sent
            kmTravelled: Number(formData.kmTravelled)
        });

        alert("GPS KM updated!");
        setFormData({ truckNo: "", date: "", kmTravelled: "" });
        console.log(res.data);
    } catch (error) {
        console.error(error.response?.data || error.message);
        alert(error.response?.data?.error || "Failed to update GPS KM");
    }
};



  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

  };


  return (
    <div className="background">
      <div className="foreground">
        

          <h2 className="heading">Update GPS KM</h2>
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
              <label className="input-label">KM travelled</label>
              <input
                type="number"
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
    
  );
};

export default GPSKM;
