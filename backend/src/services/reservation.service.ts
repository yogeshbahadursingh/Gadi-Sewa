import { prisma } from '../server';
import { AppError } from '../middleware/errorHandler';

interface CreateReservationInput {
  listingId: string;
  buyerId: string;
  depositAmount: number;
  expiresAt: string;
}

class ReservationService {
  // Get all reservations
  async getAllReservations(params: { page: number; limit: number; status?: string }) {
    const { page, limit, status } = params;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    const [reservations, total] = await Promise.all([
      prisma.reservation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          listing: {
            include: {
              vehicle: {
                select: {
                  id: true,
                  make: true,
                  model: true,
                  variant: true,
                  year: true,
                },
              },
            },
          },
          buyer: {
            select: {
              id: true,
              fullName: true,
              email: true,
              phone: true,
            },
          },
        },
      }),
      prisma.reservation.count({ where }),
    ]);

    return {
      reservations,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get reservation by ID
  async getReservationById(id: string) {
    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: {
        listing: {
          include: {
            vehicle: true,
            seller: {
              select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        buyer: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!reservation) {
      throw new AppError('Reservation not found', 404);
    }

    return reservation;
  }

  // Get my reservations
  async getMyReservations(buyerId: string, params: { page: number; limit: number; status?: string }) {
    const { page, limit, status } = params;
    const skip = (page - 1) * limit;

    const where: any = { buyerId };

    if (status) {
      where.status = status;
    }

    const [reservations, total] = await Promise.all([
      prisma.reservation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          listing: {
            include: {
              vehicle: {
                select: {
                  id: true,
                  make: true,
                  model: true,
                  variant: true,
                  year: true,
                },
              },
            },
          },
        },
      }),
      prisma.reservation.count({ where }),
    ]);

    return {
      reservations,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Create reservation
  async createReservation(input: CreateReservationInput) {
    // Check if listing exists
    const listing = await prisma.listing.findUnique({
      where: { id: input.listingId },
    });

    if (!listing) {
      throw new AppError('Listing not found', 404);
    }

    // Check if listing is active
    if (listing.status !== 'ACTIVE') {
      throw new AppError('Listing is not active', 400);
    }

    // Check if buyer is not the seller
    if (listing.sellerId === input.buyerId) {
      throw new AppError('You cannot reserve your own listing', 400);
    }

    // Check if there's already an active reservation
    const existingReservation = await prisma.reservation.findFirst({
      where: {
        listingId: input.listingId,
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
    });

    if (existingReservation) {
      throw new AppError('This listing already has an active reservation', 409);
    }

    // Create reservation
    const reservation = await prisma.reservation.create({
      data: {
        listingId: input.listingId,
        buyerId: input.buyerId,
        depositAmount: input.depositAmount,
        expiresAt: new Date(input.expiresAt),
      },
      include: {
        listing: {
          include: {
            vehicle: true,
          },
        },
        buyer: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return reservation;
  }

  // Update reservation
  async updateReservation(id: string, data: any, userId: string, userRole: string) {
    const reservation = await prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      throw new AppError('Reservation not found', 404);
    }

    // Check if user is buyer or admin
    if (reservation.buyerId !== userId && !['SUPER_ADMIN', 'ADMIN'].includes(userRole)) {
      throw new AppError('You do not have permission to update this reservation', 403);
    }

    const updatedReservation = await prisma.reservation.update({
      where: { id },
      data: {
        status: data.status,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
      },
      include: {
        listing: {
          include: {
            vehicle: true,
          },
        },
        buyer: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return updatedReservation;
  }
}

export const reservationService = new ReservationService();
