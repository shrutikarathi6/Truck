import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TruckDataEntry from './components/TruckDataEntry';
import TruckHistory from './components/TruckHistory';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TruckDataEntry />} />
                <Route path="/history" element={<TruckHistory />} />
            </Routes>
        </Router>
    );
};

export default App;
