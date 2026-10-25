import { prisma } from '../config/database';
import { AppError } from '../middleware/errorHandler';

export class PassportService {
  /**
   * Create a passport from an approved inspection
   */
  async createPassportFromInspection(
    inspectionId: string,
    reviewerId: string
  ) {
    // Verify inspection exists and is approved
    const inspection = await prisma.inspection.findUnique({
      where: { id: inspectionId },
      include: {
        vehicle: true,
      },
    });

    if (!inspection) {
      throw new AppError('Inspection not found', 404);
    }

    if (inspection.status !== 'APPROVED') {
      throw new AppError(
        'Can only create passport from approved inspections',
        400
      );
    }

    // Check if passport already exists for this inspection
    const existingPassport = await prisma.vehiclePassport.findFirst({
      where: { inspectionId },
    });

    if (existingPassport) {
      throw new AppError('Passport already exists for this inspection', 400);
    }

    // Get the latest version number for this vehicle
    const latestPassport = await prisma.vehiclePassport.findFirst({
      where: { vehicleId: inspection.vehicleId },
      orderBy: { version: 'desc' },
    });

    const newVersion = latestPassport ? latestPassport.version + 1 : 1;

    // Generate passport number
    const passportNumber = `GS-${inspection.vehicleId.slice(-6).toUpperCase()}-V${newVersion}-${Date.now()}`;

    // Extract grades from checklist if available
    const grades = this.extractGradesFromChecklist(inspection.checklist);

    // Create passport
    const passport = await prisma.vehiclePassport.create({
       {
        vehicleId: inspection.vehicleId,
        inspectionId,
        passportNumber,
        version: newVersion,
        status: 'PUBLISHED',
        inspectionDate: inspection.completedDate || new Date(),
        inspectorId: inspection.inspectorId,
        reviewerId,
        engineGrade: grades.engine,
        bodyGrade: grades.body,
        interiorGrade: grades.interior,
        mechanicalGrade: grades.mechanical,
        electricalGrade: grades.electrical,
        summary: inspection.findings,
        findings: inspection.checklist,
        recommendations: inspection.recommendations,
        evidencePhotos: inspection.photos,
        publishedAt: new Date(),
        verifiedAt: new Date(),
        approvedAt: inspection.approvedAt,
        approvedBy: inspection.approvedBy,
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

    return passport;
  }

  /**
   * Extract grades from checklist JSON
   */
  private extractGradesFromChecklist(checklist: any): {
    engine?: string;
    body?: string;
    interior?: string;
    mechanical?: string;
    electrical?: string;
  } {
    if (!checklist || typeof checklist !== 'object') {
      return {};
    }

    return {
      engine: checklist.engine?.grade || checklist.engineGrade,
      body: checklist.body?.grade || checklist.bodyGrade,
      interior: checklist.interior?.grade || checklist.interiorGrade,
      mechanical: checklist.mechanical?.grade || checklist.mechanicalGrade,
      electrical: checklist.electrical?.grade || checklist.electricalGrade,
    };
  }

  /**
   * Get passport by vehicle ID (latest published version)
   */
  async getPassportByVehicleId(vehicleId: string) {
    const passport = await prisma.vehiclePassport.findFirst({
      where: {
        vehicleId,
        status: 'PUBLISHED',
      },
      orderBy: { version: 'desc' },
      include: {
        vehicle: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true,
            category: true,
            mileage: true,
          },
        },
        inspector: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        reviewer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return passport;
  }

  /**
   * Get passport by passport number (for QR verification)
   */
  async getPassportByNumber(passportNumber: string) {
    const passport = await prisma.vehiclePassport.findUnique({
      where: { passportNumber },
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
          },
        },
        reviewer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!passport) {
      throw new AppError('Passport not found', 404);
    }

    return passport;
  }

  /**
   * Get all passport versions for a vehicle
   */
  async getPassportHistory(vehicleId: string) {
    const passports = await prisma.vehiclePassport.findMany({
      where: { vehicleId },
      orderBy: { version: 'desc' },
      include: {
        inspector: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        reviewer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return passports;
  }

  /**
   * Revoke a passport
   */
  async revokePassport(
    passportId: string,
    adminId: string,
    reason: string
  ) {
    // Verify user is admin
    const user = await prisma.user.findUnique({
      where: { id: adminId },
      include: { roles: true },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isAdmin = user.roles.some((role) => role.role === 'ADMIN');

    if (!isAdmin) {
      throw new AppError('Only admins can revoke passports', 403);
    }

    const passport = await prisma.vehiclePassport.findUnique({
      where: { id: passportId },
    });

    if (!passport) {
      throw new AppError('Passport not found', 404);
    }

    if (passport.status === 'REVOKED') {
      throw new AppError('Passport is already revoked', 400);
    }

    const updated = await prisma.vehiclePassport.update({
      where: { id: passportId },
       {
        status: 'REVOKED',
        revokedAt: new Date(),
        revokedBy: adminId,
        revokeReason: reason,
      },
    });

    return updated;
  }

  /**
   * Verify passport is valid
   */
  async verifyPassport(passportNumber: string) {
    const passport = await prisma.vehiclePassport.findUnique({
      where: { passportNumber },
      select: {
        id: true,
        status: true,
        vehicleId: true,
        publishedAt: true,
        expiresAt: true,
        revokedAt: true,
      },
    });

    if (!passport) {
      return {
        valid: false,
        message: 'Passport not found',
      };
    }

    if (passport.status === 'REVOKED') {
      return {
        valid: false,
        message: 'Passport has been revoked',
        revokedAt: passport.revokedAt,
      };
    }

    if (passport.status !== 'PUBLISHED') {
      return {
        valid: false,
        message: `Passport status is ${passport.status}`,
      };
    }

    if (passport.expiresAt && new Date() > passport.expiresAt) {
      return {
        valid: false,
        message: 'Passport has expired',
        expiresAt: passport.expiresAt,
      };
    }

    return {
      valid: true,
      message: 'Passport is valid',
      vehicleId: passport.vehicleId,
      publishedAt: passport.publishedAt,
    };
  }
}

export const passportService = new PassportService();
