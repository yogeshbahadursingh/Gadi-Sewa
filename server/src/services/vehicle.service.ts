import { prisma } from '../config/database';
import { createVehicleSchema, updateVehicleSchema, vehicleFilterSchema } from '../validators/vehicle';
import { AppError } from '../middleware/errorHandler';
import { Prisma } from '@prisma/client';

export class VehicleService {
  async create(sellerId: string, data: any) {
    const validated = createVehicleSchema.parse(data);
    
    const vehicle = await prisma.vehicle.create({
      data: {
        ...validated,
        sellerId,
        images: validated.images ? {
          create: validated.images
        } : undefined
      },
      include: {
        images: true,
        seller: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true
          }
        }
      }
    });
    
    return vehicle;
  }
  
  async update(vehicleId: string, userId: string, data: any) {
    const validated = updateVehicleSchema.parse(data);
    
    // Verify ownership
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    });
    
    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }
    
    if (vehicle.sellerId !== userId) {
      throw new AppError('Not authorized to edit this vehicle', 403);
    }
    
    // Update vehicle
    const updated = await prisma.vehicle.update({
      where: { id: vehicleId },
      data: validated,
      include: {
        images: true,
        seller: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true
          }
        }
      }
    });
    
    return updated;
  }
  
  async delete(vehicleId: string, userId: string) {
    // Verify ownership
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    });
    
    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }
    
    if (vehicle.sellerId !== userId) {
      throw new AppError('Not authorized to delete this vehicle', 403);
    }
    
    await prisma.vehicle.delete({
      where: { id: vehicleId }
    });
    
    return { message: 'Vehicle deleted successfully' };
  }
  
  async getById(id: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { order: 'asc' }
        },
        seller: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            avatar: true
          }
        },
        passport: {
          select: {
            id: true,
            status: true,
            passportNumber: true,
            inspectionDate: true
          }
        }
      }
    });
    
    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }
    
    // Increment views
    await prisma.vehicle.update({
      where: { id },
      data: { views: { increment: 1 } }
    });
    
    return vehicle;
  }
  
  async getAll(filters: any) {
    const validated = vehicleFilterSchema.parse(filters);
    
    const where: Prisma.VehicleWhereInput = {
      status: 'PUBLISHED'
    };
    
    // Apply filters
    if (validated.category) {
      where.category = validated.category as any;
    }
    
    if (validated.make) {
      where.make = { contains: validated.make, mode: 'insensitive' };
    }
    
    if (validated.model) {
      where.model = { contains: validated.model, mode: 'insensitive' };
    }
    
    if (validated.province) {
      where.province = validated.province;
    }
    
    if (validated.district) {
      where.district = validated.district;
    }
    
    if (validated.city) {
      where.city = validated.city;
    }
    
    if (validated.minPrice || validated.maxPrice) {
      where.price = {};
      if (validated.minPrice) where.price.gte = validated.minPrice;
      if (validated.maxPrice) where.price.lte = validated.maxPrice;
    }
    
    if (validated.minYear || validated.maxYear) {
      where.year = {};
      if (validated.minYear) where.year.gte = validated.minYear;
      if (validated.maxYear) where.year.lte = validated.maxYear;
    }
    
    if (validated.fuelType) {
      where.fuelType = validated.fuelType as any;
    }
    
    if (validated.transmission) {
      where.transmission = validated.transmission as any;
    }
    
    if (validated.condition) {
      where.condition = validated.condition as any;
    }
    
    if (validated.hasPassport !== undefined) {
      if (validated.hasPassport) {
        where.passport = {
          isNot: null,
          status: 'PUBLISHED'
        };
      } else {
        where.passport = null;
      }
    }
    
    if (validated.search) {
      where.OR = [
        { make: { contains: validated.search, mode: 'insensitive' } },
        { model: { contains: validated.search, mode: 'insensitive' } },
        { description: { contains: validated.search, mode: 'insensitive' } }
      ];
    }
    
    // Sorting
    let orderBy: Prisma.VehicleOrderByWithRelationInput = { createdAt: 'desc' };
    
    switch (validated.sortBy) {
      case 'price_asc':
        orderBy = { price: 'asc' };
        break;
      case 'price_desc':
        orderBy = { price: 'desc' };
        break;
      case 'year_desc':
        orderBy = { year: 'desc' };
        break;
      case 'mileage_asc':
        orderBy = { mileage: 'asc' };
        break;
    }
    
    // Pagination
    const skip = (validated.page - 1) * validated.limit;
    
    const [vehicles, total] = await Promise.all([
      prisma.vehicle.findMany({
        where,
        orderBy,
        skip,
        take: validated.limit,
        include: {
          images: {
            where: { isPrimary: true },
            take: 1
          },
          seller: {
            select: {
              id: true,
              firstName: true,
              lastName: true
            }
          },
          passport: {
            select: {
              id: true,
              status: true
            }
          }
        }
      }),
      prisma.vehicle.count({ where })
    ]);
    
    return {
      vehicles,
      pagination: {
        page: validated.page,
        limit: validated.limit,
        total,
        totalPages: Math.ceil(total / validated.limit)
      }
    };
  }
  
  async getBySeller(sellerId: string) {
    const vehicles = await prisma.vehicle.findMany({
      where: { sellerId },
      orderBy: { createdAt: 'desc' },
      include: {
        images: {
          where: { isPrimary: true },
          take: 1
        }
      }
    });
    
    return vehicles;
  }
  
  async markAsSold(vehicleId: string, userId: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    });
    
    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }
    
    if (vehicle.sellerId !== userId) {
      throw new AppError('Not authorized', 403);
    }
    
    const updated = await prisma.vehicle.update({
      where: { id: vehicleId },
      data: { status: 'SOLD' }
    });
    
    return updated;
  }
  
  async publish(vehicleId: string, userId: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    });
    
    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }
    
    if (vehicle.sellerId !== userId) {
      throw new AppError('Not authorized', 403);
    }
    
    const updated = await prisma.vehicle.update({
      where: { id: vehicleId },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date()
      }
    });
    
    return updated;
  }
}

export const vehicleService = new VehicleService();
