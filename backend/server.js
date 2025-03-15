import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import gpsRoutes from './routes/gpsRoutes.js';
import maintenanceRoutes from './routes/maintenanceRoutes.js';
import partRoutes from './routes/partRoutes.js';
// require("global-agent/bootstrap");
// process.env.GLOBAL_AGENT_HTTP_PROXY = "http://172.31.2.4:8080";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/gps', gpsRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/parts', partRoutes);

// Port Setup
const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
