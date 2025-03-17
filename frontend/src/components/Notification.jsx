import { useState, useEffect } from "react";
import axios from "axios";
import "./All.css";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/maintenance/notifications");
            setNotifications(res.data);
            console.log(notifications)
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    const removeNotification = (index) => {
        setNotifications(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="background">
            <div className="foreground1">
                <h2 className="heading">Notifications</h2>
                
                {notifications.length > 0 ? (
                    <div className="notification-container">
                        {notifications.map((notif, index) => (
                            <div 
                                key={index} 
                                className="notification-item"
                                style={{ 
                                    backgroundColor: index % 2 === 0 ? "#adb5bd" : "#8ecae6",
                                    padding: "10px",
                                    marginBottom: "5px",
                                    borderRadius: "5px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <div>
                                    <p><strong>Truck No:</strong> {notif.truckNo}</p>
                                    <p><strong>Message:</strong> {notif.message}</p>
                                    
                                </div>
                                <button 
                                    className="close-button" 
                                    onClick={() => removeNotification(index)}
                                    style={{
                                        background: "red",
                                        color: "white",
                                        border: "none",
                                        padding: "5px",
                                        borderRadius: "3px",
                                        cursor: "pointer"
                                    }}
                                >
                                    ✖
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No new notifications</p>
                )}
            </div>
        </div>
    );
};

export default Notification;
