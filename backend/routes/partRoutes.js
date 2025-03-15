import express from 'express';
import { 
    addPart, 
    getPartHistory, 
    updatePartToStock, 
    markPartAsScrap 
} from '../controllers/partController.js';

const router = express.Router();

// Route to add a new part entry
router.post('/add', addPart);

// Route to fetch part history by part number
router.get('/history/:partNumber', getPartHistory);

// Route to update a part to stock with details
router.put('/update-stock/:partNumber', updatePartToStock);

// Route to mark a part as scrap
router.put('/scrap/:partNumber', markPartAsScrap);

export default router;
