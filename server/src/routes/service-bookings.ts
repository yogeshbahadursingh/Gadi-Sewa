import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { authenticate, AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const router = Router();

// Validation schemas
const createBookingSchema = z.object({
  ownedVehicleId: z.string(),
  workshopId: z.string(),
  mechanicId: z.string().optional(),
  serviceType: z.string().min(1),
  description: z.string().optional(),
  scheduledDate: z.string(),
  scheduledTime: z.string().optional(),
  estimatedCost: z.number().optional(),
  customerNotes: z.string().optional(),
});

// Get user's bookings
router.get('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { status } = req.query;

    const where: any = { userId: req.userId! };
    if (status) where.status = status;

    const bookings = await prisma.serviceBooking.findMany({
      where,
      include: {
        workshop: true,
        mechanic: true,
        ownedVehicle: true,
      },
      orderBy: { scheduledDate: 'desc' },
    });

    res.json(bookings);
  } catch (error) {
    next(error);
  }
});

// Get booking by ID
router.get('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const booking = await prisma.serviceBooking.findFirst({
      where: {
        id,
        OR: [
          { userId: req.userId! },
          {
            workshop: {
              organisation: {
                roles: {
                  some: {
                    userId: req.userId!,
                    role: 'WORKSHOP_OWNER',
                  },
                },
              },
            },
          },
        ],
      },
      include: {
        workshop: true,
        mechanic: true,
        ownedVehicle: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
          },
        },
      },
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    next(error);
  }
});

// Create booking
router.post('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const validated = createBookingSchema.parse(req.body);

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

    // Verify workshop exists
    const workshop = await prisma.workshop.findUnique({
      where: { id: validated.workshopId },
    });

    if (!workshop) {
      return res.status(404).json({ error: 'Workshop not found' });
    }

    const booking = await prisma.serviceBooking.create({
       {
        userId: req.userId!,
        ...validated,
        scheduledDate: new Date(validated.scheduledDate),
        status: 'PENDING',
      },
      include: {
        workshop: true,
        ownedVehicle: true,
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
});

// Update booking status (workshop owner only)
router.put('/:id/status', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status, workshopNotes, finalCost } = req.body;

    // Verify workshop ownership
    const booking = await prisma.serviceBooking.findFirst({
      where: {
        id,
        workshop: {
          organisation: {
            roles: {
              some: {
                userId: req.userId!,
                role: 'WORKSHOP_OWNER',
              },
            },
          },
        },
      },
    });

    if (!booking) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const updateData: any = { status };
    if (workshopNotes) updateData.workshopNotes = workshopNotes;
    if (finalCost) updateData.finalCost = finalCost;
    if (status === 'COMPLETED') updateData.completedAt = new Date();
    if (status === 'CANCELLED') updateData.cancelledAt = new Date();

    const updated = await prisma.serviceBooking.update({
      where: { id },
       updateData,
      include: {
        workshop: true,
        ownedVehicle: true,
      },
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// Cancel booking (user only)
router.post('/:id/cancel', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    // Verify ownership
    const booking = await prisma.serviceBooking.findFirst({
      where: {
        id,
        userId: req.userId!,
      },
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.status === 'COMPLETED' || booking.status === 'CANCELLED') {
      return res.status(400).json({ error: 'Cannot cancel this booking' });
    }

    const updated = await prisma.serviceBooking.update({
      where: { id },
       {
        status: 'CANCELLED',
        cancelledAt: new Date(),
        cancellationReason: reason,
      },
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// Get workshop's bookings (workshop owner only)
router.get('/workshop/:workshopId', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { workshopId } = req.params;
    const { status } = req.query;

    // Verify workshop ownership
    const workshop = await prisma.workshop.findFirst({
      where: {
        id: workshopId,
        organisation: {
          roles: {
            some: {
              userId: req.userId!,
              role: 'WORKSHOP_OWNER',
            },
          },
        },
      },
    });

    if (!workshop) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const where: any = { workshopId };
    if (status) where.status = status;

    const bookings = await prisma.serviceBooking.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
          },
        },
        ownedVehicle: true,
        mechanic: true,
      },
      orderBy: { scheduledDate: 'desc' },
    });

    res.json(bookings);
  } catch (error) {
    next(error);
  }
});

export default router;
