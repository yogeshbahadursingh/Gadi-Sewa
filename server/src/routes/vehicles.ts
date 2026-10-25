import { Router, Request, Response, NextFunction } from 'express';
import { vehicleService } from '../services/vehicle.service';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Get all vehicles (public)
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await vehicleService.getAll(req.query);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

// Get vehicle by ID (public)
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vehicle = await vehicleService.getById(req.params.id);
    res.json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    next(error);
  }
});

// Create vehicle (authenticated)
router.post('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const vehicle = await vehicleService.create(req.userId!, req.body);
    res.status(201).json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    next(error);
  }
});

// Update vehicle (authenticated, owner only)
router.put('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const vehicle = await vehicleService.update(req.params.id, req.userId!, req.body);
    res.json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    next(error);
  }
});

// Delete vehicle (authenticated, owner only)
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await vehicleService.delete(req.params.id, req.userId!);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

// Get my vehicles (authenticated)
router.get('/seller/my-vehicles', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const vehicles = await vehicleService.getBySeller(req.userId!);
    res.json({
      success: true,
      data: vehicles
    });
  } catch (error) {
    next(error);
  }
});

// Mark as sold (authenticated, owner only)
router.post('/:id/sold', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const vehicle = await vehicleService.markAsSold(req.params.id, req.userId!);
    res.json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    next(error);
  }
});

// Publish vehicle (authenticated, owner only)
router.post('/:id/publish', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const vehicle = await vehicleService.publish(req.params.id, req.userId!);
    res.json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    next(error);
  }
});

export default router;
