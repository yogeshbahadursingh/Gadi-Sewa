import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { authenticate, AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const router = Router();

// Validation schemas
const createAssistanceRequestSchema = z.object({
  ownedVehicleId: z.string(),
  providerId: z.string().optional(),
  requestType: z.enum(['TOWING', 'BATTERY_JUMP_START', 'TYRE_CHANGE', 'FUEL_DELIVERY', 'LOCKOUT_SERVICE', 'MECHANICAL_BREAKDOWN', 'ACCIDENT_RECOVERY', 'OTHER']),
  description: z.string().min(1),
  location: z.string().min(1),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

// Get all providers
router.get('/providers', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { province, district, service } = req.query;

    const where: any = { verified: true };

    if (province) where.province = province;
    if (district) where.district = district;

    if (service) {
      where.services = {
        has: service as string,
      };
    }

    const providers = await prisma.roadsideAssistanceProvider.findMany({
      where,
      orderBy: { averageRating: 'desc' },
    });

    res.json(providers);
  } catch (error) {
    next(error);
  }
});

// Get provider by ID
router.get('/providers/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const provider = await prisma.roadsideAssistanceProvider.findUnique({
      where: { id },
    });

    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    res.json(provider);
  } catch (error) {
    next(error);
  }
});

// Get user's assistance requests
router.get('/requests', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { status } = req.query;

    const where: any = { userId: req.userId! };
    if (status) where.status = status;

    const requests = await prisma.roadsideAssistanceRequest.findMany({
      where,
      include: {
        provider: true,
        ownedVehicle: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(requests);
  } catch (error) {
    next(error);
  }
});

// Get request by ID
router.get('/requests/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const request = await prisma.roadsideAssistanceRequest.findFirst({
      where: {
        id,
        userId: req.userId!,
      },
      include: {
        provider: true,
        ownedVehicle: true,
      },
    });

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json(request);
  } catch (error) {
    next(error);
  }
});

// Create assistance request
router.post('/requests', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const validated = createAssistanceRequestSchema.parse(req.body);

    // Verify owned vehicle belongs to user
    const ownedVehicle = await prisma.ownedVehicle.findFirst({
      where: {
        id: validated.ownedVehicleId,
        userId: req.userId!,
      },
    });

    if (!ownedVehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // If provider specified, verify it exists
    if (validated.providerId) {
      const provider = await prisma.roadsideAssistanceProvider.findUnique({
        where: { id: validated.providerId },
      });

      if (!provider) {
        return res.status(404).json({ error: 'Provider not found' });
      }
    }

    const request = await prisma.roadsideAssistanceRequest.create({
       {
        userId: req.userId!,
        ...validated,
        status: validated.providerId ? 'ASSIGNED' : 'PENDING',
        assignedAt: validated.providerId ? new Date() : null,
      },
      include: {
        provider: true,
        ownedVehicle: true,
      },
    });

    res.status(201).json(request);
  } catch (error) {
    next(error);
  }
});

// Update request status (provider only)
router.put('/requests/:id/status', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status, serviceNotes, estimatedCost, finalCost } = req.body;

    // Verify provider ownership
    const request = await prisma.roadsideAssistanceRequest.findFirst({
      where: {
        id,
        provider: {
          organisation: {
            roles: {
              some: {
                userId: req.userId!,
                role: 'ROADSIDE_PROVIDER',
              },
            },
          },
        },
      },
    });

    if (!request) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const updateData: any = { status };
    if (serviceNotes) updateData.serviceNotes = serviceNotes;
    if (estimatedCost) updateData.estimatedCost = estimatedCost;
    if (finalCost) updateData.finalCost = finalCost;
    if (status === 'COMPLETED') {
      updateData.completedAt = new Date();
      updateData.resolvedAt = new Date();
    }

    const updated = await prisma.roadsideAssistanceRequest.update({
      where: { id },
       updateData,
      include: {
        provider: true,
        ownedVehicle: true,
      },
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// Assign provider to request (admin or provider)
router.post('/requests/:id/assign', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { providerId } = req.body;

    // Verify provider exists
    const provider = await prisma.roadsideAssistanceProvider.findUnique({
      where: { id: providerId },
    });

    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    const updated = await prisma.roadsideAssistanceRequest.update({
      where: { id },
       {
        providerId,
        status: 'ASSIGNED',
        assignedAt: new Date(),
      },
      include: {
        provider: true,
        ownedVehicle: true,
      },
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// Cancel request (user only)
router.post('/requests/:id/cancel', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Verify ownership
    const request = await prisma.roadsideAssistanceRequest.findFirst({
      where: {
        id,
        userId: req.userId!,
      },
    });

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    if (request.status === 'COMPLETED' || request.status === 'CANCELLED') {
      return res.status(400).json({ error: 'Cannot cancel this request' });
    }

    const updated = await prisma.roadsideAssistanceRequest.update({
      where: { id },
       {
        status: 'CANCELLED',
      },
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

export default router;
