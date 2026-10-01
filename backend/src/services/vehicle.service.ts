import { prisma } from '../server';
import { AppError } from '../middleware/errorHandler';
import { VehicleType, FuelType } from '@prisma/client';

interface GetAllVehiclesParams {
  page: number;
  limit: number;
  type?: string;
  make?: string;
  model?: string;
  year?: number;
  fuelType?: string;
  isEV?: boolean;
}

interface CreateVehicleInput {
  type: VehicleType;
  make: string;
  model: string;
  variant: string;
  year: number;
  fuelType: FuelType;
  transmission: string;
  bodyStyle: string;
  mileage: number;
  engineCC?: number;
  color: string;
  vin?: string;
  engineNumber?: string;
  registrationNumber?: string;
  registrationDate?: string;
  registeredDistrict?: string;
  isEV?: boolean;
  isHybrid?: boolean;
  batterySOH?: number;
  batteryCapacity?: number;
  condition?: string;
  ownerId: string;
}

class VehicleService {
  // Generate unique passport ID
  private generatePassportId(): string {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `NP-VP-${timestamp}${random}`;
  }

  // Get all vehicles with pagination and filtering
  async getAllVehicles(params: GetAllVehiclesParams) {
    const { page, limit, type, make, model, year, fuelType, isEV } = params;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (type) {
      where.type = type;
    }

    if (make) {
      where.make = { contains: make, mode: 'insensitive' };
    }

    if (model) {
      where.model = { contains: model, mode: 'insensitive' };
    }

    if (year) {
      where.year = year;
    }

    if (fuelType) {
      where.fuelType = fuelType;
    }

    if (isEV !== undefined) {
      where.isEV = isEV;
    }

    const [vehicles, total] = await Promise.all([
      prisma.vehicle.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
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
      }),
      prisma.vehicle.count({ where }),
    ]);

    return {
      vehicles,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get vehicle by ID
  async getVehicleById(id: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
        passport: true,
        odometerRecords: {
          orderBy: { date: 'desc' },
        },
        serviceRecords: {
          orderBy: { serviceDate: 'desc' },
        },
      },
    });

    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }

    return vehicle;
  }

  // Get vehicle by passport ID
  async getVehicleByPassportId(passportId: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { passportId },
      include: {
        owner: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
        passport: {
          include: {
            ownershipHistory: true,
            documentVerifications: true,
            riskFlags: true,
          },
        },
        odometerRecords: {
          orderBy: { date: 'desc' },
        },
        serviceRecords: {
          orderBy: { serviceDate: 'desc' },
        },
      },
    });

    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }

    return vehicle;
  }

  // Create vehicle
  async createVehicle(input: CreateVehicleInput) {
    // Check if VIN or engine number already exists
    if (input.vin) {
      const existingVehicle = await prisma.vehicle.findUnique({
        where: { vin: input.vin },
      });
      if (existingVehicle) {
        throw new AppError('Vehicle with this VIN already exists', 409);
      }
    }

    if (input.engineNumber) {
      const existingVehicle = await prisma.vehicle.findUnique({
        where: { engineNumber: input.engineNumber },
      });
      if (existingVehicle) {
        throw new AppError('Vehicle with this engine number already exists', 409);
      }
    }

    if (input.registrationNumber) {
      const existingVehicle = await prisma.vehicle.findUnique({
        where: { registrationNumber: input.registrationNumber },
      });
      if (existingVehicle) {
        throw new AppError('Vehicle with this registration number already exists', 409);
      }
    }

    // Generate passport ID
    const passportId = this.generatePassportId();

    // Create vehicle and passport in a transaction
    const vehicle = await prisma.$transaction(async (tx) => {
      // Create vehicle
      const newVehicle = await tx.vehicle.create({
        data: {
          ...input,
          passportId,
          registrationDate: input.registrationDate ? new Date(input.registrationDate) : undefined,
        },
      });

      // Create passport
      await tx.vehiclePassport.create({
        data: {
          passportId,
          vehicleId: newVehicle.id,
          qrCode: `VP-${passportId}-QR`,
          ownershipHistory: {
            create: {
              ownerId: input.ownerId,
              ownerName: '', // Will be updated with actual owner name
              startDate: new Date(),
              isCurrent: true,
              verificationSource: 'SYSTEM_GENERATED',
            },
          },
        },
      });

      return newVehicle;
    });

    return vehicle;
  }

  // Update vehicle
  async updateVehicle(id: string, data: any, userId: string, userRole: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }

    // Check if user is owner or admin
    if (vehicle.ownerId !== userId && !['SUPER_ADMIN', 'ADMIN'].includes(userRole)) {
      throw new AppError('You do not have permission to update this vehicle', 403);
    }

    // Check if VIN or engine number is being changed and if it's already taken
    if (data.vin && data.vin !== vehicle.vin) {
      const existingVehicle = await prisma.vehicle.findUnique({
        where: { vin: data.vin },
      });
      if (existingVehicle) {
        throw new AppError('VIN already in use', 409);
      }
    }

    if (data.engineNumber && data.engineNumber !== vehicle.engineNumber) {
      const existingVehicle = await prisma.vehicle.findUnique({
        where: { engineNumber: data.engineNumber },
      });
      if (existingVehicle) {
        throw new AppError('Engine number already in use', 409);
      }
    }

    if (data.registrationNumber && data.registrationNumber !== vehicle.registrationNumber) {
      const existingVehicle = await prisma.vehicle.findUnique({
        where: { registrationNumber: data.registrationNumber },
      });
      if (existingVehicle) {
        throw new AppError('Registration number already in use', 409);
      }
    }

    const updatedVehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        ...data,
        registrationDate: data.registrationDate ? new Date(data.registrationDate) : undefined,
      },
    });

    return updatedVehicle;
  }

  // Delete vehicle
  async deleteVehicle(id: string, userId: string, userRole: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }

    // Check if user is owner or admin
    if (vehicle.ownerId !== userId && !['SUPER_ADMIN', 'ADMIN'].includes(userRole)) {
      throw new AppError('You do not have permission to delete this vehicle', 403);
    }

    // Delete vehicle and all related data
    await prisma.$transaction(async (tx) => {
      // Delete passport and related data
      await tx.vehiclePassport.deleteMany({
        where: { vehicleId: id },
      });

      // Delete odometer records
      await tx.odometerRecord.deleteMany({
        where: { vehicleId: id },
      });

      // Delete service records
      await tx.serviceRecord.deleteMany({
        where: { vehicleId: id },
      });

      // Delete vehicle
      await tx.vehicle.delete({
        where: { id },
      });
    });

    return { message: 'Vehicle deleted successfully' };
  }
}

export const vehicleService = new VehicleService();
