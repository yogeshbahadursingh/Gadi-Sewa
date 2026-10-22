import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const router = Router();

// Validation schemas
const createWorkshopSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  logo: z.string().url().optional(),
  phone: z.string().min(1),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  province: z.string().min(1),
  district: z.string().min(1),
  city: z.string().min(1),
  address: z.string().min(1),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  services: z.array(z.string()),
  specializations: z.array(z.string()),
  openingHours: z.any().optional(),
});

const createReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  title: z.string().optional(),
  comment: z.string().min(1),
  serviceType: z.string().optional(),
  serviceDate: z.string().optional(),
  serviceBookingId: z.string().optional(),
});

// Get all workshops with filters
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { province, district, city, service, search, verified } = req.query;

    const where: any = {};

    if (province) where.province = province;
    if (district) where.district = district;
    if (city) where.city = city;
    if (verified === 'true') where.verified = true;

    if (service) {
      where.services = {
        has: service as string,
      };
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { city: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const workshops = await prisma.workshop.findMany({
      where,
      include: {
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      orderBy: { averageRating: 'desc' },
    });

    // Calculate average rating
    const workshopsWithRatings = workshops.map((workshop) => {
      const ratings = workshop.reviews.map((r) => r.rating);
      const averageRating = ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
        : null;

      return {
        ...workshop,
        averageRating,
        totalReviews: ratings.length,
        reviews: undefined,
      };
    });

    res.json(workshopsWithRatings);
  } catch (error) {
    next(error);
  }
});

// Get workshop by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const workshop = await prisma.workshop.findUnique({
      where: { id },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        mechanics: {
          where: { available: true },
        },
      },
    });

    if (!workshop) {
      return res.status(404).json({ error: 'Workshop not found' });
    }

    res.json(workshop);
  } catch (error) {
    next(error);
  }
});

// Create workshop (requires WORKSHOP_OWNER role)
router.post('/', authenticate, authorize('WORKSHOP_OWNER'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const validated = createWorkshopSchema.parse(req.body);

    const workshop = await prisma.workshop.create({
       {
        ...validated,
        verified: false, // New workshops need verification
      },
    });

    res.status(201).json(workshop);
  } catch (error) {
    next(error);
  }
});

// Update workshop (owner only)
router.put('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Verify ownership
    const workshop = await prisma.workshop.findFirst({
      where: {
        id,
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

    const updated = await prisma.workshop.update({
      where: { id },
       req.body,
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// Add review
router.post('/:id/reviews', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validated = createReviewSchema.parse(req.body);

    // Check if workshop exists
    const workshop = await prisma.workshop.findUnique({
      where: { id },
    });

    if (!workshop) {
      return res.status(404).json({ error: 'Workshop not found' });
    }

    // Check if user already reviewed this workshop
    const existingReview = await prisma.workshopReview.findFirst({
      where: {
        workshopId: id,
        userId: req.userId!,
      },
    });

    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this workshop' });
    }

    const review = await prisma.workshopReview.create({
       {
        workshopId: id,
        userId: req.userId!,
        ...validated,
        serviceDate: validated.serviceDate ? new Date(validated.serviceDate) : null,
      },
    });

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
});

// Get workshop reviews
router.get('/:id/reviews', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const reviews = await prisma.workshopReview.findMany({
      where: { workshopId: id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

// Get workshop mechanics
router.get('/:id/mechanics', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const mechanics = await prisma.mechanic.findMany({
      where: { workshopId: id },
      orderBy: { averageRating: 'desc' },
    });

    res.json(mechanics);
  } catch (error) {
    next(error);
  }
});

export default router;
