import { Router, Request, Response, NextFunction } from 'express';
import { inspectionService } from '../services/inspection.service';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const router = Router();

// Validation schemas
const requestInspectionSchema = z.object({
  vehicleId: z.string(),
  notes: z.string().optional(),
  preferredDate: z.string().optional(),
});

const assignInspectorSchema = z.object({
  inspectorId: z.string(),
});

const submitInspectionSchema = z.object({
  checklist: z.any(),
  findings: z.string().min(1, 'Findings are required'),
  defects: z.any().optional(),
  recommendations: z.string().optional(),
  photos: z.array(z.string()).min(1, 'At least one photo is required'),
  odometerPhoto: z.string().optional(),
  chassisPhoto: z.string().optional(),
});

const updateStatusSchema = z.object({
  status: z.enum(['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED']),
  rejectionReason: z.string().optional(),
});

// Request inspection (buyer or seller)
router.post(
  '/request',
  authenticate,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const validated = requestInspectionSchema.parse(req.body);
      const inspection = await inspectionService.requestInspection(
        validated.vehicleId,
        req.userId!,
        validated.notes,
        validated.preferredDate
      );

      res.status(201).json({
        success: true,
         inspection,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get inspections by vehicle ID
router.get(
  '/vehicle/:vehicleId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inspections = await inspectionService.getInspectionsByVehicle(
        req.params.vehicleId
      );

      res.json({
        success: true,
         inspections,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get inspection by ID
router.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inspection = await inspectionService.getInspectionById(req.params.id);

      res.json({
        success: true,
         inspection,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Assign inspector (admin/reviewer only)
router.post(
  '/:id/assign',
  authenticate,
  authorize('ADMIN', 'REVIEWER'),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const validated = assignInspectorSchema.parse(req.body);
      const inspection = await inspectionService.assignInspector(
        req.params.id,
        validated.inspectorId,
        req.userId!
      );

      res.json({
        success: true,
         inspection,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Submit inspection findings (inspector only)
router.post(
  '/:id/submit',
  authenticate,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const validated = submitInspectionSchema.parse(req.body);
      const inspection = await inspectionService.submitInspection(
        req.params.id,
        req.userId!,
        validated
      );

      res.json({
        success: true,
         inspection,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Update inspection status
router.put(
  '/:id/status',
  authenticate,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const validated = updateStatusSchema.parse(req.body);
      const inspection = await inspectionService.updateInspectionStatus(
        req.params.id,
        validated.status,
        req.userId!,
        validated.rejectionReason
      );

      res.json({
        success: true,
         inspection,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get inspector's assigned inspections
router.get(
  '/inspector/assignments',
  authenticate,
  authorize('INSPECTOR'),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const inspections = await inspectionService.getInspectorAssignments(
        req.userId!
      );

      res.json({
        success: true,
         inspections,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get all pending inspection requests (admin/reviewer only)
router.get(
  '/pending',
  authenticate,
  authorize('ADMIN', 'REVIEWER'),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const inspections = await inspectionService.getPendingRequests();

      res.json({
        success: true,
         inspections,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
