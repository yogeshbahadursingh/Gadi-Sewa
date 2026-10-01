import { prisma } from '../server';
import { AppError } from '../middleware/errorHandler';

interface GetAllListingsParams {
  page: number;
  limit: number;
  status?: string;
  district?: string;
  make?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  isEV?: boolean;
  isInspected?: boolean;
  hasPassport?: boolean;
}

interface CreateListingInput {
  vehicleId: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  negotiable?: boolean;
  location: string;
  district: string;
  images: string[];
  expiresAt: string;
}

class ListingService {
  // Get all listings with pagination and filtering
  async getAllListings(params: GetAllListingsParams) {
    const { page, limit, status, district, make, model, minPrice, maxPrice, isEV, isInspected, hasPassport } = params;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (status) {
      where.status = status;
    } else {
      where.status = 'ACTIVE'; // Default to active listings
    }

    if (district) {
      where.district = { contains: district, mode: 'insensitive' };
    }

    if (minPrice) {
      where.price = { gte: minPrice };
    }

    if (maxPrice) {
      where.price = { ...where.price, lte: maxPrice };
    }

    if (isEV !== undefined) {
      where.vehicle = { isEV };
    }

    if (isInspected !== undefined) {
      where.isInspected = isInspected;
    }

    if (hasPassport !== undefined) {
      where.hasPassport = hasPassport;
    }

    if (make || model) {
      where.vehicle = {
        ...where.vehicle,
      };
      if (make) {
        where.vehicle.make = { contains: make, mode: 'insensitive' };
      }
      if (model) {
        where.vehicle.model = { contains: model, mode: 'insensitive' };
      }
    }

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
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
              fuelType: true,
              transmission: true,
              isEV: true,
              batterySOH: true,
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
      prisma.listing.count({ where }),
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

  // Get listing by ID
  async getListingById(id: string) {
    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        vehicle: {
          include: {
            owner: {
              select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
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
        offers: {
          include: {
            buyer: {
              select: {
                id: true,
                fullName: true,
              },
            },
          },
        },
      },
    });

    if (!listing) {
      throw new AppError('Listing not found', 404);
    }

    // Increment view count
    await prisma.listing.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return listing;
  }

  // Get my listings
  async getMyListings(sellerId: string, params: { page: number; limit: number; status?: string }) {
    const { page, limit, status } = params;
    const skip = (page - 1) * limit;

    const where: any = { sellerId };

    if (status) {
      where.status = status;
    }

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
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
            },
          },
        },
      }),
      prisma.listing.count({ where }),
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

  // Create listing
  async createListing(input: CreateListingInput) {
    // Check if vehicle exists
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: input.vehicleId },
    });

    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }

    // Check if vehicle is already listed
    const existingListing = await prisma.listing.findUnique({
      where: { vehicleId: input.vehicleId },
    });

    if (existingListing) {
      throw new AppError('Vehicle is already listed', 409);
    }

    // Check if user owns the vehicle
    if (vehicle.ownerId !== input.sellerId) {
      throw new AppError('You can only list vehicles you own', 403);
    }

    // Check if vehicle has passport
    const hasPassport = !!(await prisma.vehiclePassport.findUnique({
      where: { vehicleId: input.vehicleId },
    }));

    // Create listing
    const listing = await prisma.listing.create({
      data: {
        vehicleId: input.vehicleId,
        sellerId: input.sellerId,
        title: input.title,
        description: input.description,
        price: input.price,
        negotiable: input.negotiable ?? true,
        location: input.location,
        district: input.district,
        images: input.images,
        hasPassport,
        expiresAt: new Date(input.expiresAt),
      },
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
    });

    return listing;
  }

  // Update listing
  async updateListing(id: string, data: any, userId: string, userRole: string) {
    const listing = await prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      throw new AppError('Listing not found', 404);
    }

    // Check if user is seller or admin
    if (listing.sellerId !== userId && !['SUPER_ADMIN', 'ADMIN'].includes(userRole)) {
      throw new AppError('You do not have permission to update this listing', 403);
    }

    const updatedListing = await prisma.listing.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        negotiable: data.negotiable,
        location: data.location,
        district: data.district,
        images: data.images,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
      },
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
    });

    return updatedListing;
  }

  // Delete listing
  async deleteListing(id: string, userId: string, userRole: string) {
    const listing = await prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      throw new AppError('Listing not found', 404);
    }

    // Check if user is seller or admin
    if (listing.sellerId !== userId && !['SUPER_ADMIN', 'ADMIN'].includes(userRole)) {
      throw new AppError('You do not have permission to delete this listing', 403);
    }

    await prisma.listing.delete({
      where: { id },
    });

    return { message: 'Listing deleted successfully' };
  }

  // Mark as sold
  async markAsSold(id: string, userId: string, userRole: string) {
    const listing = await prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      throw new AppError('Listing not found', 404);
    }

    // Check if user is seller or admin
    if (listing.sellerId !== userId && !['SUPER_ADMIN', 'ADMIN'].includes(userRole)) {
      throw new AppError('You do not have permission to update this listing', 403);
    }

    const updatedListing = await prisma.listing.update({
      where: { id },
      data: { status: 'SOLD' },
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
    });

    return updatedListing;
  }
}

export const listingService = new ListingService();
