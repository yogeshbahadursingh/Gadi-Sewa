import { Router } from 'express';
import { inspectionController } from '../controllers/inspection.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get all inspections
router.get('/', inspectionController.getAllInspections);

// Get inspection by ID
router.get('/:id', inspectionController.getInspectionById);

// Create inspection (inspectors and admins)
router.post('/', authorize('INSPECTOR', 'INSPECTION_MANAGER', 'SUPER_ADMIN', 'ADMIN'), inspectionController.createInspection);

// Update inspection
router.put('/:id', inspectionController.updateInspection);

// Get inspector's inspections
router.get('/inspector/my-inspections', inspectionController.getMyInspections);

export default router;
