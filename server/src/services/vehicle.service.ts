import { prisma } from '../config/database';

export class VehicleService {
  async create(sellerId: string, data: any) {
    const vehicle = await prisma.vehicle.create({
      data: {
        sellerId,
        status: 'DRAFT',
        category: data.category,
        make: data.make,
        model: data.model,
        variant: data.variant,
        year: data.year,
        price: data.price,
        negotiable: data.negotiable || false,
        mileage: data.mileage,
        fuelType: data.fuelType,
        transmission: data.transmission,
        engineCC: data.engineCC,
        province: data.province,
        district: data.district,
        city: data.city,
        description: data.description,
        condition: data.condition,
      },
      include: {
        images: true,
        seller: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return vehicle;
  }

  async update(id: string, userId: string, data: any) {
    // Verify ownership
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    if (vehicle.sellerId !== userId) {
      throw new Error('Not authorized');
    }

    // Update vehicle
    const updated = await prisma.vehicle.update({
      where: { id },
      data: {
        category: data.category,
        make: data.make,
        model: data.model,
        variant: data.variant,
        year: data.year,
        price: data.price,
        negotiable: data.negotiable,
        mileage: data.mileage,
        fuelType: data.fuelType,
        transmission: data.transmission,
        engineCC: data.engineCC,
        province: data.province,
        district: data.district,
        city: data.city,
        description: data.description,
        condition: data.condition,
      },
      include: {
        images: true,
      },
    });

    return updated;
  }

  async delete(id: string, userId: string) {
    // Verify ownership
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    if (vehicle.sellerId !== userId) {
      throw new Error('Not authorized');
    }

    await prisma.vehicle.delete({
      where: { id },
    });

    return { message: 'Vehicle deleted successfully' };
  }

  async getAll(filters: any) {
    const where: any = {
      status: 'PUBLISHED',
    };

    // Apply filters
    if (filters.category) {
      where.category = filters.category;
    }

    if (filters.minPrice || filters.maxPrice) {
      where.price = {};
      if (filters.minPrice) where.price.gte = filters.minPrice;
      if (filters.maxPrice) where.price.lte = filters.maxPrice;
    }

    if (filters.province) {
      where.province = filters.province;
    }

    if (filters.hasPassport !== undefined) {
      if (filters.hasPassport) {
        where.passport = {
          isNot: null,
          status: 'PUBLISHED',
        };
      } else {
        where.passport = null;
      }
    }

    // Sorting
    let orderBy: any = { createdAt: 'desc' };
    if (filters.sortBy === 'price_asc') {
      orderBy = { price: 'asc' };
    } else if (filters.sortBy === 'price_desc') {
      orderBy = { price: 'desc' };
    } else if (filters.sortBy === 'year_desc') {
      orderBy = { year: 'desc' };
    } else if (filters.sortBy === 'mileage_asc') {
      orderBy = { mileage: 'asc' };
    }

    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const [vehicles, total] = await Promise.all([
      prisma.vehicle.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          images: {
            where: { isPrimary: true },
            take: 1,
          },
          seller: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          passport: {
            select: {
              id: true,
              status: true,
            },
          },
        },
      }),
      prisma.vehicle.count({ where }),
    ]);

    return {
      vehicles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
