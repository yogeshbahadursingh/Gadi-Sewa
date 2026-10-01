import { prisma } from '../server';
import { AppError } from '../middleware/errorHandler';

interface GetAllInspectionsParams {
  page: number;
  limit: number;
  status?: string;
  vehicleId?: string;
}

interface CreateInspectionInput {
  vehicleId: string;
  inspectorId: string;
  templateType: string;
  scheduledDate: string;
  location: string;
  sections?: any[];
  notes?: string;
}

class InspectionService {
  // Get all inspections
  async getAllInspections(params: GetAllInspectionsParams) {
    const { page, limit, status, vehicleId } = params;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (vehicleId) {
      where.vehicleId = vehicleId;
    }

    const [inspections, total] = await Promise.all([
      prisma.inspection.findMany({
        where,
        skip,
        take: limit,
        orderBy: { scheduledDate: 'desc' },
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
          inspector: {
            select: {
              id: true,
              fullName: true,
              email: true,
              phone: true,
            },
          },
          sections: {
            include: {
              items: true,
            },
          },
        },
      }),
      prisma.inspection.count({ where }),
    ]);

    return {
      inspections,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get inspection by ID
  async getInspectionById(id: string) {
    const inspection = await prisma.inspection.findUnique({
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
        inspector: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
        sections: {
          include: {
            items: {
              include: {
                photos: true,
              },
            },
          },
        },
        photos: true,
      },
    });

    if (!inspection) {
      throw new AppError('Inspection not found', 404);
    }

    return inspection;
  }

  // Get my inspections (for inspectors)
  async getMyInspections(inspectorId: string, params: { page: number; limit: number; status?: string }) {
    const { page, limit, status } = params;
    const skip = (page - 1) * limit;

    const where: any = { inspectorId };

    if (status) {
      where.status = status;
    }

    const [inspections, total] = await Promise.all([
      prisma.inspection.findMany({
        where,
        skip,
        take: limit,
        orderBy: { scheduledDate: 'desc' },
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
        },
      }),
      prisma.inspection.count({ where }),
    ]);

    return {
      inspections,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Create inspection
  async createInspection(input: CreateInspectionInput) {
    // Check if vehicle exists
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: input.vehicleId },
    });

    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }

    // Create inspection with sections and items
    const inspection = await prisma.inspection.create({
      data: {
        vehicleId: input.vehicleId,
        inspectorId: input.inspectorId,
        templateType: input.templateType,
        scheduledDate: new Date(input.scheduledDate),
        location: input.location,
        status: 'SCHEDULED',
        sections: input.sections ? {
          create: input.sections.map((section: any) => ({
            name: section.name,
            category: section.category,
            items: {
              create: section.items?.map((item: any) => ({
                name: item.name,
                result: item.result || 'NOT_APPLICABLE',
                severity: item.severity,
                comment: item.comment,
                measurement: item.measurement,
              })),
            },
          })),
        } : undefined,
        notes: input.notes,
      },
      include: {
        vehicle: true,
        inspector: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
        sections: {
          include: {
            items: true,
          },
        },
      },
    });

    return inspection;
  }

  // Update inspection
  async updateInspection(id: string, data: any, userId: string, userRole: string) {
    const inspection = await prisma.inspection.findUnique({
      where: { id },
    });

    if (!inspection) {
      throw new AppError('Inspection not found', 404);
    }

    // Check if user is inspector or admin
    if (inspection.inspectorId !== userId && !['SUPER_ADMIN', 'ADMIN', 'INSPECTION_MANAGER'].includes(userRole)) {
      throw new AppError('You do not have permission to update this inspection', 403);
    }

    const updatedInspection = await prisma.inspection.update({
      where: { id },
      data: {
        status: data.status,
        completedDate: data.completedDate ? new Date(data.completedDate) : undefined,
        overallResult: data.overallResult,
        notes: data.notes,
        recommendation: data.recommendation,
        supervisorReviewed: data.supervisorReviewed,
      },
      include: {
        vehicle: true,
        inspector: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
        sections: {
          include: {
            items: true,
          },
        },
      },
    });

    return updatedInspection;
  }
}

export const inspectionService = new InspectionService();
