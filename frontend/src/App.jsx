import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home.jsx";
import AddTruck from "./components/AddTruck.jsx";
import GpsKm from "./components/GPSKM.jsx";
import Maintenance from "./components/Maintenance.jsx";
import Part from "./components/Part.jsx";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-truck" element={<AddTruck />} />
        <Route path="/gps-km" element={<GpsKm />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/part" element={<Part />} />
      </Routes>
    </Router>
  );
};

export default App;
