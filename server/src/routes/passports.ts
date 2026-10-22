import { Router, Request, Response, NextFunction } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../config/database';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// Get passport by vehicle ID (public)
router.get('/vehicle/:vehicleId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const passport = await prisma.vehiclePassport.findUnique({
      where: { vehicleId: req.params.vehicleId },
      include: {
        vehicle: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true
          }
        },
        inspector: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        reviewer: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });
    
    if (!passport) {
      throw new AppError('Passport not found', 404);
    }
    
    // Only show published passports publicly
    if (passport.status !== 'PUBLISHED') {
      throw new AppError('Passport not available', 404);
    }
    
    res.json({
      success: true,
      data: passport
    });
  } catch (error) {
    next(error);
  }
});

// Get passport by passport number (public, for QR verification)
router.get('/verify/:passportNumber', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const passport = await prisma.vehiclePassport.findUnique({
      where: { passportNumber: req.params.passportNumber },
      include: {
        vehicle: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true
          }
        }
      }
    });
    
    if (!passport || passport.status !== 'PUBLISHED') {
      throw new AppError('Passport not found or not verified', 404);
    }
    
    res.json({
      success: true,
      data: {
        verified: true,
        passportNumber: passport.passportNumber,
        vehicle: passport.vehicle,
        inspectionDate: passport.inspectionDate,
        verifiedAt: passport.verifiedAt
      }
    });
  } catch (error) {
    next(error);
  }
});

// Approve passport (reviewer only)
router.post('/:id/approve', authenticate, authorize('REVIEWER', 'ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const passport = await prisma.vehiclePassport.update({
      where: { id: req.params.id },
      data: {
        status: 'PUBLISHED',
        reviewerId: req.userId,
        publishedAt: new Date(),
        verifiedAt: new Date()
      }
    });
    
    res.json({
      success: true,
      data: passport
    });
  } catch (error) {
    next(error);
  }
});

// Revoke passport (admin only)
router.post('/:id/revoke', authenticate, authorize('ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const passport = await prisma.vehiclePassport.update({
      where: { id: req.params.id },
      data: {
        status: 'REVOKED'
      }
    });
    
    res.json({
      success: true,
      data: passport
    });
  } catch (error) {
    next(error);
  }
});

export default router;
