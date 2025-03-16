import { Link, useLocation } from "react-router-dom";
import { Truck, MapPin, Settings, Package } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/add-truck" className={`nav-btn ${location.pathname === "/add-truck" ? "active" : ""}`}>
          <Truck size={22} />
          Add Truck
        </Link>
        <Link to="/gps-km" className={`nav-btn ${location.pathname === "/gps-km" ? "active" : ""}`}>
          <MapPin size={22} />
          GPS KM
        </Link>
        <Link to="/maintenance" className={`nav-btn ${location.pathname === "/maintenance" ? "active" : ""}`}>
          <Settings size={22} />
          Maintenance
        </Link>
        <Link to="/part" className={`nav-btn ${location.pathname === "/part" ? "active" : ""}`}>
          <Package size={22} />
          Add Part
        </Link>
      </div>
      <div className="nav-right">Truck Management</div>
    </nav>
  );
};

export default Navbar;
