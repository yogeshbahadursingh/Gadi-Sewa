import { Router } from 'express';
import { vehicleController } from '../controllers/vehicle.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', vehicleController.getAllVehicles);
router.get('/:id', vehicleController.getVehicleById);
router.get('/passport/:passportId', vehicleController.getVehicleByPassportId);

// Protected routes
router.use(authenticate);

// Create vehicle (sellers and admins)
router.post('/', authorize('PRIVATE_SELLER', 'DEALER_OWNER', 'DEALER_MANAGER', 'SUPER_ADMIN', 'ADMIN'), vehicleController.createVehicle);

// Update vehicle (owner or admin)
router.put('/:id', vehicleController.updateVehicle);

// Delete vehicle (owner or admin)
router.delete('/:id', vehicleController.deleteVehicle);

export default router;
