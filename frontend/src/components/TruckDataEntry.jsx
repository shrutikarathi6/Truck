import React, { useState } from 'react';
import axios from 'axios';

const TruckDataEntry = () => {
    const [formData, setFormData] = useState({
        truckNumber: '',
        date: '',
        gpsKm: '',
        categories: [],
        selectedCategory: '',
        periodicityType: ''
    });

    const categoriesList = ['Engine Oil', 'Battery', 'Clutch', 'Tyre'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddCategory = () => {
        if (formData.selectedCategory && !formData.categories.includes(formData.selectedCategory)) {
            setFormData({
                ...formData,
                categories: [...formData.categories, formData.selectedCategory],
                selectedCategory: ''
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/truck-data', formData);
            alert('Data submitted successfully');
        } catch (error) {
            alert('Error submitting data');
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Truck Data Entry</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="truckNumber"
                    placeholder="Truck Number"
                    value={formData.truckNumber}
                    onChange={handleChange}
                    required
                    className="p-2 border border-gray-300 rounded w-full"
                />
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="p-2 border border-gray-300 rounded w-full"
                />
                <input
                    type="number"
                    name="gpsKm"
                    placeholder="GPS KM"
                    value={formData.gpsKm}
                    onChange={handleChange}
                    required
                    className="p-2 border border-gray-300 rounded w-full"
                />
                <select
                    name="selectedCategory"
                    value={formData.selectedCategory}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded w-full"
                >
                    <option value="">Select Category</option>
                    {categoriesList.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    onClick={handleAddCategory}
                    className="bg-blue-500 text-white p-2 rounded w-full"
                >
                    Add Category
                </button>
                <ul>
                    {formData.categories.map((category, index) => (
                        <li key={index}>{category}</li>
                    ))}
                </ul>
                <select
                    name="periodicityType"
                    value={formData.periodicityType}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded w-full"
                >
                    <option value="">Select Periodicity Type</option>
                    <option value="yearly">Yearly</option>
                    <option value="kmBased">10000 KM Based</option>
                </select>
                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded w-full"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default TruckDataEntry;
