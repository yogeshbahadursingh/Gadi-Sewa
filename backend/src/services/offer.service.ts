import { prisma } from '../server';
import { AppError } from '../middleware/errorHandler';

interface CreateOfferInput {
  listingId: string;
  buyerId: string;
  amount: number;
  message?: string;
}

class OfferService {
  // Get all offers
  async getAllOffers(params: { page: number; limit: number; status?: string; listingId?: string }) {
    const { page, limit, status, listingId } = params;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (listingId) {
      where.listingId = listingId;
    }

    const [offers, total] = await Promise.all([
      prisma.offer.findMany({
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
          seller: {
            select: {
              id: true,
              fullName: true,
              email: true,
              phone: true,
            },
          },
        },
      }),
      prisma.offer.count({ where }),
    ]);

    return {
      offers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get offer by ID
  async getOfferById(id: string) {
    const offer = await prisma.offer.findUnique({
      where: { id },
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
        seller: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!offer) {
      throw new AppError('Offer not found', 404);
    }

    return offer;
  }

  // Get my offers as buyer
  async getMyOffersAsBuyer(buyerId: string, params: { page: number; limit: number; status?: string }) {
    const { page, limit, status } = params;
    const skip = (page - 1) * limit;

    const where: any = { buyerId };

    if (status) {
      where.status = status;
    }

    const [offers, total] = await Promise.all([
      prisma.offer.findMany({
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
          seller: {
            select: {
              id: true,
              fullName: true,
              email: true,
              phone: true,
            },
          },
        },
      }),
      prisma.offer.count({ where }),
    ]);

    return {
      offers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get received offers as seller
  async getReceivedOffersAsSeller(sellerId: string, params: { page: number; limit: number; status?: string }) {
    const { page, limit, status } = params;
    const skip = (page - 1) * limit;

    const where: any = { sellerId };

    if (status) {
      where.status = status;
    }

    const [offers, total] = await Promise.all([
      prisma.offer.findMany({
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
      prisma.offer.count({ where }),
    ]);

    return {
      offers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Create offer
  async createOffer(input: CreateOfferInput) {
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
      throw new AppError('You cannot make an offer on your own listing', 400);
    }

    // Create offer
    const offer = await prisma.offer.create({
      data: {
        listingId: input.listingId,
        buyerId: input.buyerId,
        sellerId: listing.sellerId,
        amount: input.amount,
        message: input.message,
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
        seller: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return offer;
  }

  // Update offer
  async updateOffer(id: string, data: any, userId: string, userRole: string) {
    const offer = await prisma.offer.findUnique({
      where: { id },
    });

    if (!offer) {
      throw new AppError('Offer not found', 404);
    }

    // Check if user is buyer, seller, or admin
    if (offer.buyerId !== userId && offer.sellerId !== userId && !['SUPER_ADMIN', 'ADMIN'].includes(userRole)) {
      throw new AppError('You do not have permission to update this offer', 403);
    }

    const updatedOffer = await prisma.offer.update({
      where: { id },
      data: {
        status: data.status,
        counterAmount: data.counterAmount,
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
        seller: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return updatedOffer;
  }
}

export const offerService = new OfferService();
