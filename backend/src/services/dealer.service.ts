import { prisma } from '../server';
import { AppError } from '../middleware/errorHandler';

interface CreateDealerInput {
  userId: string;
  companyName: string;
  logo?: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
}

class DealerService {
  // Get all dealers
  async getAllDealers(params: { page: number; limit: number; verified?: boolean }) {
    const { page, limit, verified } = params;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (verified !== undefined) {
      where.verified = verified;
    }

    const [dealers, total] = await Promise.all([
      prisma.dealer.findMany({
        where,
        skip,
        take: limit,
        orderBy: { rating: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              phone: true,
            },
          },
          branches: true,
        },
      }),
      prisma.dealer.count({ where }),
    ]);

    return {
      dealers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get dealer by ID
  async getDealerById(id: string) {
    const dealer = await prisma.dealer.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
        branches: true,
      },
    });

    if (!dealer) {
      throw new AppError('Dealer not found', 404);
    }

    return dealer;
  }

  // Get dealer's inventory
  async getDealerInventory(dealerId: string, params: { page: number; limit: number }) {
    const { page, limit } = params;
    const skip = (page - 1) * limit;

    const dealer = await prisma.dealer.findUnique({
      where: { id: dealerId },
    });

    if (!dealer) {
      throw new AppError('Dealer not found', 404);
    }

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where: { sellerId: dealer.userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          vehicle: {
            select: {
              id: true,
              make: true,
              model: true,
              variant: true,
              year: true,
              mileage: true,
              price: true,
            },
          },
        },
      }),
      prisma.listing.count({ where: { sellerId: dealer.userId } }),
    ]);

    return {
      listings,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Create dealer
  async createDealer(input: CreateDealerInput) {
    // Check if user already has a dealer profile
    const existingDealer = await prisma.dealer.findUnique({
      where: { userId: input.userId },
    });

    if (existingDealer) {
      throw new AppError('User already has a dealer profile', 409);
    }

    // Create dealer
    const dealer = await prisma.dealer.create({
      data: input,
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return dealer;
  }

  // Update dealer
  async updateDealer(id: string, data: any, userId: string, userRole: string) {
    const dealer = await prisma.dealer.findUnique({
      where: { id },
    });

    if (!dealer) {
      throw new AppError('Dealer not found', 404);
    }

    // Check if user is dealer owner or admin
    if (dealer.userId !== userId && !['SUPER_ADMIN', 'ADMIN'].includes(userRole)) {
      throw new AppError('You do not have permission to update this dealer', 403);
    }

    const updatedDealer = await prisma.dealer.update({
      where: { id },
      data: {
        companyName: data.companyName,
        logo: data.logo,
        description: data.description,
        address: data.address,
        phone: data.phone,
        email: data.email,
        website: data.website,
        verified: data.verified,
        rating: data.rating,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return updatedDealer;
  }
}

export const dealerService = new DealerService();
