import { prisma } from '../config/database';
import { AppError } from '../middleware/errorHandler';

export class GarageService {
  /**
   * Add a vehicle to user's garage
   */
  async addVehicleToGarage(
    userId: string,
     {
      vehicleId,
      make,
      model,
      year,
      registrationNumber,
      vin,
      purchaseDate,
      purchasePrice,
      currentMileage,
    }: {
      vehicleId?: string;
      make?: string;
      model?: string;
      year?: number;
      registrationNumber?: string;
      vin?: string;
      purchaseDate?: string;
      purchasePrice?: number;
      currentMileage?: number;
    }
  ) {
    // If vehicleId is provided, verify it exists
    if (vehicleId) {
      const vehicle = await prisma.vehicle.findUnique({
        where: { id: vehicleId },
      });

      if (!vehicle) {
        throw new AppError('Vehicle not found', 404);
      }

      // Use vehicle details if not provided
      make = make || vehicle.make;
      model = model || vehicle.model;
      year = year || vehicle.year;
    }

    // Validate required fields
    if (!make || !model || !year) {
      throw new AppError(
        'Make, model, and year are required',
        400
      );
    }

    // Check if user already has this vehicle in garage
    if (vehicleId) {
      const existing = await prisma.ownedVehicle.findFirst({
        where: {
          userId,
          vehicleId,
          status: 'ACTIVE',
        },
      });

      if (existing) {
        throw new AppError(
          'Vehicle is already in your garage',
          400
        );
      }
    }

    // Create owned vehicle
    const ownedVehicle = await prisma.ownedVehicle.create({
       {
        userId,
        vehicleId,
        make,
        model,
        year,
        registrationNumber,
        vin,
        purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
        purchasePrice,
        currentMileage: currentMileage || 0,
        status: 'ACTIVE',
      },
    });

    return ownedVehicle;
  }

  /**
   * Get all vehicles in user's garage
   */
  async getUserVehicles(userId: string) {
    const vehicles = await prisma.ownedVehicle.findMany({
      where: { userId },
      include: {
        maintenanceRecords: {
          orderBy: { serviceDate: 'desc' },
          take: 5,
        },
        documents: {
          orderBy: { createdAt: 'desc' },
        },
        expenses: {
          orderBy: { date: 'desc' },
          take: 10,
        },
        reminders: {
          where: { status: 'PENDING' },
          orderBy: { dueDate: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return vehicles;
  }

  /**
   * Get owned vehicle by ID
   */
  async getOwnedVehicle(ownedVehicleId: string, userId: string) {
    const vehicle = await prisma.ownedVehicle.findFirst({
      where: {
        id: ownedVehicleId,
        userId,
      },
      include: {
        maintenanceRecords: {
          orderBy: { serviceDate: 'desc' },
        },
        documents: {
          orderBy: { createdAt: 'desc' },
        },
        expenses: {
          orderBy: { date: 'desc' },
        },
        reminders: {
          orderBy: { dueDate: 'asc' },
        },
      },
    });

    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }

    return vehicle;
  }

  /**
   * Update owned vehicle
   */
  async updateOwnedVehicle(
    ownedVehicleId: string,
    userId: string,
     {
      currentMileage,
      status,
      registrationNumber,
      vin,
    }: {
      currentMileage?: number;
      status?: 'ACTIVE' | 'SOLD' | 'INACTIVE';
      registrationNumber?: string;
      vin?: string;
    }
  ) {
    const vehicle = await prisma.ownedVehicle.findFirst({
      where: {
        id: ownedVehicleId,
        userId,
      },
    });

    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }

    const updated = await prisma.ownedVehicle.update({
      where: { id: ownedVehicleId },
       {
        currentMileage,
        status,
        registrationNumber,
        vin,
      },
    });

    return updated;
  }

  /**
   * Remove vehicle from garage
   */
  async removeVehicleFromGarage(ownedVehicleId: string, userId: string) {
    const vehicle = await prisma.ownedVehicle.findFirst({
      where: {
        id: ownedVehicleId,
        userId,
      },
    });

    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }

    await prisma.ownedVehicle.delete({
      where: { id: ownedVehicleId },
    });

    return { message: 'Vehicle removed from garage' };
  }

  /**
   * Add maintenance record
   */
  async addMaintenanceRecord(
    ownedVehicleId: string,
    userId: string,
     {
      serviceType,
      serviceDate,
      mileageAtService,
      cost,
      description,
      notes,
      photos,
      invoices,
      workshopId,
    }: {
      serviceType: string;
      serviceDate: string;
      mileageAtService?: number;
      cost?: number;
      description?: string;
      notes?: string;
      photos?: string[];
      invoices?: string[];
      workshopId?: string;
    }
  ) {
    // Verify ownership
    const vehicle = await prisma.ownedVehicle.findFirst({
      where: {
        id: ownedVehicleId,
        userId,
      },
    });

    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }

    const record = await prisma.maintenanceRecord.create({
       {
        ownedVehicleId,
        serviceType,
        serviceDate: new Date(serviceDate),
        mileageAtService,
        cost,
        description,
        notes,
        photos: photos || [],
        invoices: invoices || [],
        workshopId,
      },
    });

    // Update vehicle mileage if provided
    if (mileageAtService && mileageAtService > vehicle.currentMileage) {
      await prisma.ownedVehicle.update({
        where: { id: ownedVehicleId },
         { currentMileage: mileageAtService },
      });
    }

    return record;
  }

  /**
   * Get maintenance records for a vehicle
   */
  async getMaintenanceRecords(ownedVehicleId: string, userId: string) {
    // Verify ownership
    const vehicle = await prisma.ownedVehicle.findFirst({
      where: {
        id: ownedVehicleId,
        userId,
      },
    });

    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }

    const records = await prisma.maintenanceRecord.findMany({
      where: { ownedVehicleId },
      orderBy: { serviceDate: 'desc' },
    });

    return records;
  }

  /**
   * Add vehicle document
   */
  async addDocument(
    ownedVehicleId: string,
    userId: string,
     {
      documentType,
      title,
      documentNumber,
      issueDate,
      expiryDate,
      fileUrl,
      fileSize,
    }: {
      documentType: string;
      title: string;
      documentNumber?: string;
      issueDate?: string;
      expiryDate?: string;
      fileUrl: string;
      fileSize?: number;
    }
  ) {
    // Verify ownership
    const vehicle = await prisma.ownedVehicle.findFirst({
      where: {
        id: ownedVehicleId,
        userId,
      },
    });

    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }

    const document = await prisma.vehicleDocument.create({
       {
        ownedVehicleId,
        documentType: documentType as any,
        title,
        documentNumber,
        issueDate: issueDate ? new Date(issueDate) : null,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        fileUrl,
        fileSize,
      },
    });

    return document;
  }

  /**
   * Get documents for a vehicle
   */
  async getDocuments(ownedVehicleId: string, userId: string) {
    // Verify ownership
    const vehicle = await prisma.ownedVehicle.findFirst({
      where: {
        id: ownedVehicleId,
        userId,
      },
    });

    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }

    const documents = await prisma.vehicleDocument.findMany({
      where: { ownedVehicleId },
      orderBy: { createdAt: 'desc' },
    });

    return documents;
  }

  /**
   * Add expense
   */
  async addExpense(
    ownedVehicleId: string,
    userId: string,
     {
      expenseType,
      amount,
      date,
      description,
      vendor,
      receiptUrl,
    }: {
      expenseType: string;
      amount: number;
      date: string;
      description?: string;
      vendor?: string;
      receiptUrl?: string;
    }
  ) {
    // Verify ownership
    const vehicle = await prisma.ownedVehicle.findFirst({
      where: {
        id: ownedVehicleId,
        userId,
      },
    });

    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }

    const expense = await prisma.vehicleExpense.create({
       {
        ownedVehicleId,
        expenseType: expenseType as any,
        amount,
        date: new Date(date),
        description,
        vendor,
        receiptUrl,
      },
    });

    return expense;
  }

  /**
   * Get expenses for a vehicle
   */
  async getExpenses(ownedVehicleId: string, userId: string) {
    // Verify ownership
    const vehicle = await prisma.ownedVehicle.findFirst({
      where: {
        id: ownedVehicleId,
        userId,
      },
    });

    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }

    const expenses = await prisma.vehicleExpense.findMany({
      where: { ownedVehicleId },
      orderBy: { date: 'desc' },
    });

    return expenses;
  }

  /**
   * Add reminder
   */
  async addReminder(
    ownedVehicleId: string,
    userId: string,
     {
      reminderType,
      title,
      description,
      dueDate,
      mileageDue,
    }: {
      reminderType: string;
      title: string;
      description?: string;
      dueDate?: string;
      mileageDue?: number;
    }
  ) {
    // Verify ownership
    const vehicle = await prisma.ownedVehicle.findFirst({
      where: {
        id: ownedVehicleId,
        userId,
      },
    });

    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }

    const reminder = await prisma.vehicleReminder.create({
       {
        ownedVehicleId,
        userId,
        reminderType: reminderType as any,
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        mileageDue,
        status: 'PENDING',
      },
    });

    return reminder;
  }

  /**
   * Get reminders for a vehicle
   */
  async getReminders(ownedVehicleId: string, userId: string) {
    // Verify ownership
    const vehicle = await prisma.ownedVehicle.findFirst({
      where: {
        id: ownedVehicleId,
        userId,
      },
    });

    if (!vehicle) {
      throw new AppError('Vehicle not found', 404);
    }

    const reminders = await prisma.vehicleReminder.findMany({
      where: { ownedVehicleId },
      orderBy: { dueDate: 'asc' },
    });

    return reminders;
  }

  /**
   * Mark reminder as complete
   */
  async completeReminder(reminderId: string, userId: string) {
    const reminder = await prisma.vehicleReminder.findFirst({
      where: {
        id: reminderId,
        userId,
      },
    });

    if (!reminder) {
      throw new AppError('Reminder not found', 404);
    }

    const updated = await prisma.vehicleReminder.update({
      where: { id: reminderId },
       {
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    });

    return updated;
  }

  /**
   * Get garage statistics
   */
  async getGarageStats(userId: string) {
    const vehicles = await prisma.ownedVehicle.findMany({
      where: { userId },
      include: {
        maintenanceRecords: true,
        expenses: true,
        reminders: {
          where: { status: 'PENDING' },
        },
      },
    });

    const totalVehicles = vehicles.length;
    const activeVehicles = vehicles.filter((v) => v.status === 'ACTIVE').length;
    const totalMaintenanceRecords = vehicles.reduce(
      (sum, v) => sum + v.maintenanceRecords.length,
      0
    );
    const totalExpenses = vehicles.reduce(
      (sum, v) => sum + v.expenses.reduce((s, e) => s + e.amount, 0),
      0
    );
    const pendingReminders = vehicles.reduce(
      (sum, v) => sum + v.reminders.length,
      0
    );

    return {
      totalVehicles,
      activeVehicles,
      totalMaintenanceRecords,
      totalExpenses,
      pendingReminders,
    };
  }
}

export const garageService = new GarageService();
