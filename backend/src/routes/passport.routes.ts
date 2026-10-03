import { Router } from 'express';
import { passportController } from '../controllers/passport.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/:passportId', passportController.getPassportByPassportId);

// Protected routes
router.use(authenticate);

// Get all passports
router.get('/', passportController.getAllPassports);

// Get passport by vehicle ID
router.get('/vehicle/:vehicleId', passportController.getPassportByVehicleId);

export default router;
