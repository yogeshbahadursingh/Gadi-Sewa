import { prisma } from '../config/database';
import { AppError } from '../middleware/errorHandler';

export class InspectionService {
  /**
   * Request a new inspection for a vehicle
   */
  async requestInspection(
    vehicleId: string,
    userId: string,
    notes?: string,
    preferredDate?: string
  ) {
    // Verify vehicle exists and is published
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }

    if (vehicle.status !== 'PUBLISHED') {
      throw new AppError('Can only request inspection for published vehicles', 400);
    }

    // Check if there's already an active inspection
    const existingInspection = await prisma.inspection.findFirst({
      where: {
        vehicleId,
        status: {
          in: ['REQUESTED', 'SCHEDULED', 'IN_PROGRESS', 'UNDER_REVIEW'],
        },
      },
    });

    if (existingInspection) {
      throw new AppError(
        'An active inspection already exists for this vehicle',
        400
      );
    }

    // Create inspection request
    const inspection = await prisma.inspection.create({
       {
        vehicleId,
        status: 'REQUESTED',
        notes,
        scheduledDate: preferredDate ? new Date(preferredDate) : null,
        requestedBy: userId,
      },
      include: {
        vehicle: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true,
            category: true,
          },
        },
      },
    });

    return inspection;
  }

  /**
   * Get all inspections for a vehicle
   */
  async getInspectionsByVehicle(vehicleId: string) {
    const inspections = await prisma.inspection.findMany({
      where: { vehicleId },
      include: {
        inspector: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return inspections;
  }

  /**
   * Get inspection by ID
   */
  async getInspectionById(inspectionId: string) {
    const inspection = await prisma.inspection.findUnique({
      where: { id: inspectionId },
      include: {
        vehicle: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true,
            category: true,
            mileage: true,
            province: true,
            district: true,
            city: true,
          },
        },
        inspector: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!inspection) {
      throw new AppError('Inspection not found', 404);
    }

    return inspection;
  }

  /**
   * Assign an inspector to an inspection
   */
  async assignInspector(
    inspectionId: string,
    inspectorId: string,
    adminUserId: string
  ) {
    // Verify user is admin or reviewer
    const user = await prisma.user.findUnique({
      where: { id: adminUserId },
      include: { roles: true },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const hasPermission = user.roles.some(
      (role) => role.role === 'ADMIN' || role.role === 'REVIEWER'
    );

    if (!hasPermission) {
      throw new AppError('Only admins or reviewers can assign inspectors', 403);
    }

    // Verify inspector exists and has INSPECTOR role
    const inspector = await prisma.user.findUnique({
      where: { id: inspectorId },
      include: { roles: true },
    });

    if (!inspector) {
      throw new AppError('Inspector not found', 404);
    }

    const isInspector = inspector.roles.some((role) => role.role === 'INSPECTOR');

    if (!isInspector) {
      throw new AppError('User does not have INSPECTOR role', 400);
    }

    // Verify inspection exists and is in REQUESTED status
    const inspection = await prisma.inspection.findUnique({
      where: { id: inspectionId },
    });

    if (!inspection) {
      throw new AppError('Inspection not found', 404);
    }

    if (inspection.status !== 'REQUESTED') {
      throw new AppError(
        'Can only assign inspector to requested inspections',
        400
      );
    }

    // Update inspection
    const updated = await prisma.inspection.update({
      where: { id: inspectionId },
       {
        inspectorId,
        status: 'SCHEDULED',
      },
      include: {
        inspector: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return updated;
  }

  /**
   * Submit inspection findings
   */
  async submitInspection(
    inspectionId: string,
    inspectorId: string,
     {
      checklist,
      findings,
      defects,
      recommendations,
      photos,
      odometerPhoto,
      chassisPhoto,
    }: {
      checklist: any;
      findings: string;
      defects?: any;
      recommendations?: string;
      photos: string[];
      odometerPhoto?: string;
      chassisPhoto?: string;
    }
  ) {
    // Verify inspector owns this inspection
    const inspection = await prisma.inspection.findUnique({
      where: { id: inspectionId },
    });

    if (!inspection) {
      throw new AppError('Inspection not found', 404);
    }

    if (inspection.inspectorId !== inspectorId) {
      throw new AppError('Not authorized to submit this inspection', 403);
    }

    if (inspection.status !== 'SCHEDULED' && inspection.status !== 'IN_PROGRESS') {
      throw new AppError(
        'Inspection must be in SCHEDULED or IN_PROGRESS status',
        400
      );
    }

    // Update inspection with findings
    const updated = await prisma.inspection.update({
      where: { id: inspectionId },
       {
        checklist,
        findings,
        defects,
        recommendations,
        photos,
        odometerPhoto,
        chassisPhoto,
        status: 'COMPLETED',
        completedDate: new Date(),
      },
    });

    return updated;
  }

  /**
   * Update inspection status
   */
  async updateInspectionStatus(
    inspectionId: string,
    status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED',
    userId: string,
    rejectionReason?: string
  ) {
    const inspection = await prisma.inspection.findUnique({
      where: { id: inspectionId },
    });

    if (!inspection) {
      throw new AppError('Inspection not found', 404);
    }

    // Verify permissions based on status change
    if (status === 'APPROVED' || status === 'REJECTED') {
      // Only admins or reviewers can approve/reject
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { roles: true },
      });

      if (!user) {
        throw new AppError('User not found', 404);
      }

      const hasPermission = user.roles.some(
        (role) => role.role === 'ADMIN' || role.role === 'REVIEWER'
      );

      if (!hasPermission) {
        throw new AppError(
          'Only admins or reviewers can approve/reject inspections',
          403
        );
      }
    } else if (status === 'IN_PROGRESS') {
      // Only the assigned inspector can start inspection
      if (inspection.inspectorId !== userId) {
        throw new AppError('Only the assigned inspector can start inspection', 403);
      }
    }

    const updateData: any = { status };

    if (status === 'REJECTED' && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }

    if (status === 'APPROVED') {
      updateData.approvedAt = new Date();
      updateData.approvedBy = userId;
    }

    const updated = await prisma.inspection.update({
      where: { id: inspectionId },
       updateData,
    });

    return updated;
  }

  /**
   * Get inspections assigned to an inspector
   */
  async getInspectorAssignments(inspectorId: string) {
    const inspections = await prisma.inspection.findMany({
      where: { inspectorId },
      include: {
        vehicle: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true,
            category: true,
            province: true,
            district: true,
            city: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return inspections;
  }

  /**
   * Get all pending inspection requests (for admin/reviewer)
   */
  async getPendingRequests() {
    const inspections = await prisma.inspection.findMany({
      where: { status: 'REQUESTED' },
      include: {
        vehicle: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true,
            category: true,
            province: true,
            district: true,
            city: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return inspections;
  }
}

export const inspectionService = new InspectionService();
