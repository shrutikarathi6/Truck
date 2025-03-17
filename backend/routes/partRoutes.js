import express from 'express';
import { 
    getPartHistory, 
    updatePartToStock, 
    assignOrAddPart,
    markPartAsScrap 
} from '../controllers/partController.js';

const router = express.Router();


// Route to fetch part history by part number
router.get('/history/:partNo', getPartHistory);

// Route to update a part to stock with details
router.put('/stock/:partNo', updatePartToStock);
router.put("/assign/:partNo", assignOrAddPart);
router.put('/scrap/:partNo', markPartAsScrap);

export default router;
