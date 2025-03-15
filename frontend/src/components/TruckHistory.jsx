import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TruckHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get('/api/truck-history');
                setHistory(response.data);
            } catch (error) {
                console.error('Error fetching truck history:', error);
            }
        };
        fetchHistory();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Truck History</h2>
            <ul>
                {history.map((entry, index) => (
                    <li key={index} className="border p-2 rounded mb-2">
                        {entry.truckNumber} - {entry.date} - {entry.km} KM
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TruckHistory;
