import express from 'express';
import { 
    addPart, 
    getPartHistory, 
    updatePartToStock, 
    assignPartToTruck,
    markPartAsScrap 
} from '../controllers/partController.js';

const router = express.Router();

// Route to add a new part entry
router.post('/add', addPart);

// Route to fetch part history by part number
router.get('/history/:partNo', getPartHistory);

// Route to update a part to stock with details
router.put('/update-stock/:partNo', updatePartToStock);

router.put('/assign/:partNo',assignPartToTruck);

// Route to mark a part as scrap
router.put('/scrap/:partNo', markPartAsScrap);

export default router;
