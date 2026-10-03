import { Router } from 'express';
import { dealerController } from '../controllers/dealer.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', dealerController.getAllDealers);
router.get('/:id', dealerController.getDealerById);

// Protected routes
router.use(authenticate);

// Create dealer (admin only)
router.post('/', authorize('SUPER_ADMIN', 'ADMIN'), dealerController.createDealer);

// Update dealer
router.put('/:id', dealerController.updateDealer);

// Get dealer's inventory
router.get('/:id/inventory', dealerController.getDealerInventory);

export default router;
