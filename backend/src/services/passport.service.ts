import { prisma } from '../server';
import { AppError } from '../middleware/errorHandler';

class PassportService {
  // Get all passports
  async getAllPassports(params: { page: number; limit: number }) {
    const { page, limit } = params;
    const skip = (page - 1) * limit;

    const [passports, total] = await Promise.all([
      prisma.vehiclePassport.findMany({
        skip,
        take: limit,
        orderBy: { issuedDate: 'desc' },
        include: {
          vehicle: {
            select: {
              id: true,
              make: true,
              model: true,
              variant: true,
              year: true,
              registrationNumber: true,
            },
          },
          ownershipHistory: true,
          documentVerifications: true,
          riskFlags: true,
        },
      }),
      prisma.vehiclePassport.count(),
    ]);

    return {
      passports,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get passport by passport ID
  async getPassportByPassportId(passportId: string) {
    const passport = await prisma.vehiclePassport.findUnique({
      where: { passportId },
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
        ownershipHistory: {
          orderBy: { startDate: 'desc' },
        },
        documentVerifications: true,
        riskFlags: true,
      },
    });

    if (!passport) {
      throw new AppError('Passport not found', 404);
    }

    return passport;
  }

  // Get passport by vehicle ID
  async getPassportByVehicleId(vehicleId: string) {
    const passport = await prisma.vehiclePassport.findUnique({
      where: { vehicleId },
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
        ownershipHistory: {
          orderBy: { startDate: 'desc' },
        },
        documentVerifications: true,
        riskFlags: true,
      },
    });

    if (!passport) {
      throw new AppError('Passport not found', 404);
    }

    return passport;
  }
}

export const passportService = new PassportService();
