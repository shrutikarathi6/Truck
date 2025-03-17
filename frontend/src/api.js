import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Truck APIs
export const addTruck = (data) => API.post("/trucks/add", data);

// GPS APIs
export const addGPSData = (data) => API.post("/gps/add-gps", data);
export const getTruckHistory = (truckNo) => API.get(`/gps/history/${truckNo}`);

// Maintenance APIs
export const addMaintenance = (data) => API.post("/maintenance/add", data);
export const getNotifications = () => API.get("/maintenance/notifications");

// Part APIs
export const getPartHistory = (partNo) => API.get(`/parts/history/${partNo}`);
export const updateStock = (partNo, data) => API.put(`/parts/update-stock/${partNo}`, data);
export const assignPart = (partNo, data) => API.put(`/parts/assign/${partNo}`, data);
export const markAsScrap = (partNo) => API.put(`/parts/scrap/${partNo}`);

export default API;
