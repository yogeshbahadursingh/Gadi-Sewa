import { Router, Request, Response, NextFunction } from 'express';
import { passportService } from '../services/passport.service';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const router = Router();

// Validation schemas
const createPassportSchema = z.object({
  inspectionId: z.string(),
});

const revokePassportSchema = z.object({
  reason: z.string().min(1, 'Reason is required'),
});

// Create passport from approved inspection (admin/reviewer only)
router.post(
  '/create',
  authenticate,
  authorize('ADMIN', 'REVIEWER'),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const validated = createPassportSchema.parse(req.body);
      const passport = await passportService.createPassportFromInspection(
        validated.inspectionId,
        req.userId!
      );

      res.status(201).json({
        success: true,
         passport,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get passport by vehicle ID (public)
router.get(
  '/vehicle/:vehicleId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const passport = await passportService.getPassportByVehicleId(
        req.params.vehicleId
      );

      if (!passport) {
        return res.json({
          success: true,
           { hasPassport: false },
        });
      }

      res.json({
        success: true,
         {
          hasPassport: true,
          passport,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get passport by passport number (public - for QR verification)
router.get(
  '/verify/:passportNumber',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const passport = await passportService.getPassportByNumber(
        req.params.passportNumber
      );

      res.json({
        success: true,
         passport,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Verify passport validity (public)
router.get(
  '/check/:passportNumber',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await passportService.verifyPassport(
        req.params.passportNumber
      );

      res.json({
        success: true,
         result,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get passport history for a vehicle (public)
router.get(
  '/history/:vehicleId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const passports = await passportService.getPassportHistory(
        req.params.vehicleId
      );

      res.json({
        success: true,
         passports,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Revoke passport (admin only)
router.post(
  '/:id/revoke',
  authenticate,
  authorize('ADMIN'),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const validated = revokePassportSchema.parse(req.body);
      const passport = await passportService.revokePassport(
        req.params.id,
        req.userId!,
        validated.reason
      );

      res.json({
        success: true,
         passport,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
