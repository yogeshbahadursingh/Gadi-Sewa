import { Router, Response, NextFunction } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../config/database';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// Request inspection (buyer or seller)
router.post('/request', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { vehicleId, scheduledDate, location, notes } = req.body;
    
    // Verify vehicle exists
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    });
    
    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }
    
    // Check if inspection already exists
    const existing = await prisma.inspection.findUnique({
      where: { vehicleId }
    });
    
    if (existing) {
      throw new AppError('Inspection already exists for this vehicle', 400);
    }
    
    const inspection = await prisma.inspection.create({
      data: {
        vehicleId,
        status: 'REQUESTED',
        scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
        location,
        notes
      }
    });
    
    res.status(201).json({
      success: true,
      data: inspection
    });
  } catch (error) {
    next(error);
  }
});

// Get inspection by vehicle ID
router.get('/vehicle/:vehicleId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const inspection = await prisma.inspection.findUnique({
      where: { vehicleId: req.params.vehicleId },
      include: {
        inspector: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });
    
    if (!inspection) {
      throw new AppError('Inspection not found', 404);
    }
    
    res.json({
      success: true,
      data: inspection
    });
  } catch (error) {
    next(error);
  }
});

// Assign inspector (admin/reviewer only)
router.post('/:id/assign', authenticate, authorize('ADMIN', 'REVIEWER'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { inspectorId } = req.body;
    
    const inspection = await prisma.inspection.update({
      where: { id: req.params.id },
      data: {
        inspectorId,
        status: 'SCHEDULED'
      }
    });
    
    res.json({
      success: true,
      data: inspection
    });
  } catch (error) {
    next(error);
  }
});

// Submit inspection findings (inspector only)
router.post('/:id/submit', authenticate, authorize('INSPECTOR'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { findings, defects, recommendations, photos, odometerPhoto, chassisPhoto } = req.body;
    
    // Verify inspector is assigned
    const inspection = await prisma.inspection.findUnique({
      where: { id: req.params.id }
    });
    
    if (!inspection) {
      throw new AppError('Inspection not found', 404);
    }
    
    if (inspection.inspectorId !== req.userId) {
      throw new AppError('Not authorized', 403);
    }
    
    const updated = await prisma.inspection.update({
      where: { id: req.params.id },
      data: {
        findings,
        defects,
        recommendations,
        photos,
        odometerPhoto,
        chassisPhoto,
        status: 'COMPLETED',
        completedDate: new Date()
      }
    });
    
    res.json({
      success: true,
      data: updated
    });
  } catch (error) {
    next(error);
  }
});

export default router;
