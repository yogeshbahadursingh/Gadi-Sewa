import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { authenticate, AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const router = Router();

// Validation schemas
const createOwnedVehicleSchema = z.object({
  vehicleId: z.string().optional(),
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().int().min(1900).max(2030),
  registrationNumber: z.string().optional(),
  vin: z.string().optional(),
  purchaseDate: z.string().optional(),
  purchasePrice: z.number().optional(),
  currentMileage: z.number().int().min(0),
});

const createMaintenanceRecordSchema = z.object({
  serviceType: z.string().min(1),
  serviceDate: z.string(),
  mileageAtService: z.number().int().optional(),
  cost: z.number().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
  workshopId: z.string().optional(),
});

const createDocumentSchema = z.object({
  documentType: z.enum(['BLUEBOOK', 'INSURANCE', 'TAX_RECEIPT', 'REGISTRATION', 'POLLUTION_CERTIFICATE', 'SERVICE_RECORD', 'INVOICE', 'OTHER']),
  title: z.string().min(1),
  documentNumber: z.string().optional(),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
  fileUrl: z.string().url(),
  fileSize: z.number().optional(),
});

const createExpenseSchema = z.object({
  expenseType: z.enum(['FUEL', 'MAINTENANCE', 'REPAIR', 'INSURANCE', 'TAX', 'PARKING', 'TOLL', 'ACCESSORIES', 'OTHER']),
  amount: z.number().positive(),
  date: z.string(),
  description: z.string().optional(),
  vendor: z.string().optional(),
  receiptUrl: z.string().url().optional(),
});

const createReminderSchema = z.object({
  reminderType: z.enum(['SERVICE', 'INSURANCE', 'TAX', 'BLUEBOOK_RENEWAL', 'POLLUTION_CERTIFICATE', 'CUSTOM']),
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  mileageDue: z.number().int().optional(),
});

// Get user's owned vehicles
router.get('/vehicles', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const vehicles = await prisma.ownedVehicle.findMany({
      where: { userId: req.userId! },
      include: {
        maintenanceRecords: {
          orderBy: { serviceDate: 'desc' },
        },
        documents: true,
        expenses: {
          orderBy: { date: 'desc' },
        },
        reminders: {
          orderBy: { dueDate: 'asc' },
        },
        vehicle: {
          include: {
            passport: {
              where: { status: 'PUBLISHED' },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(vehicles);
  } catch (error) {
    next(error);
  }
});

// Add owned vehicle
router.post('/vehicles', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const validated = createOwnedVehicleSchema.parse(req.body);

    const vehicle = await prisma.ownedVehicle.create({
       {
        userId: req.userId!,
        ...validated,
        purchaseDate: validated.purchaseDate ? new Date(validated.purchaseDate) : null,
      },
    });

    res.status(201).json(vehicle);
  } catch (error) {
    next(error);
  }
});

// Update owned vehicle
router.put('/vehicles/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Verify ownership
    const existing = await prisma.ownedVehicle.findFirst({
      where: { id, userId: req.userId! },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    const vehicle = await prisma.ownedVehicle.update({
      where: { id },
       updateData,
    });

    res.json(vehicle);
  } catch (error) {
    next(error);
  }
});

// Delete owned vehicle
router.delete('/vehicles/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Verify ownership
    const existing = await prisma.ownedVehicle.findFirst({
      where: { id, userId: req.userId! },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    await prisma.ownedVehicle.delete({
      where: { id },
    });

    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Add maintenance record
router.post('/vehicles/:id/maintenance', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validated = createMaintenanceRecordSchema.parse(req.body);

    // Verify ownership
    const vehicle = await prisma.ownedVehicle.findFirst({
      where: { id, userId: req.userId! },
    });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    const record = await prisma.maintenanceRecord.create({
       {
        ownedVehicleId: id,
        ...validated,
        serviceDate: new Date(validated.serviceDate),
      },
    });

    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
});

// Get maintenance records
router.get('/vehicles/:id/maintenance', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const records = await prisma.maintenanceRecord.findMany({
      where: { ownedVehicleId: id },
      orderBy: { serviceDate: 'desc' },
    });

    res.json(records);
  } catch (error) {
    next(error);
  }
});

// Add document
router.post('/vehicles/:id/documents', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validated = createDocumentSchema.parse(req.body);

    // Verify ownership
    const vehicle = await prisma.ownedVehicle.findFirst({
      where: { id, userId: req.userId! },
    });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    const document = await prisma.vehicleDocument.create({
       {
        ownedVehicleId: id,
        ...validated,
        issueDate: validated.issueDate ? new Date(validated.issueDate) : null,
        expiryDate: validated.expiryDate ? new Date(validated.expiryDate) : null,
      },
    });

    res.status(201).json(document);
  } catch (error) {
    next(error);
  }
});

// Get documents
router.get('/vehicles/:id/documents', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const documents = await prisma.vehicleDocument.findMany({
      where: { ownedVehicleId: id },
      orderBy: { createdAt: 'desc' },
    });

    res.json(documents);
  } catch (error) {
    next(error);
  }
});

// Add expense
router.post('/vehicles/:id/expenses', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validated = createExpenseSchema.parse(req.body);

    // Verify ownership
    const vehicle = await prisma.ownedVehicle.findFirst({
      where: { id, userId: req.userId! },
    });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    const expense = await prisma.vehicleExpense.create({
       {
        ownedVehicleId: id,
        ...validated,
        date: new Date(validated.date),
      },
    });

    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
});

// Get expenses
router.get('/vehicles/:id/expenses', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const expenses = await prisma.vehicleExpense.findMany({
      where: { ownedVehicleId: id },
      orderBy: { date: 'desc' },
    });

    res.json(expenses);
  } catch (error) {
    next(error);
  }
});

// Add reminder
router.post('/vehicles/:id/reminders', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validated = createReminderSchema.parse(req.body);

    // Verify ownership
    const vehicle = await prisma.ownedVehicle.findFirst({
      where: { id, userId: req.userId! },
    });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    const reminder = await prisma.vehicleReminder.create({
       {
        ownedVehicleId: id,
        userId: req.userId!,
        ...validated,
        dueDate: validated.dueDate ? new Date(validated.dueDate) : null,
      },
    });

    res.status(201).json(reminder);
  } catch (error) {
    next(error);
  }
});

// Get reminders
router.get('/vehicles/:id/reminders', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const reminders = await prisma.vehicleReminder.findMany({
      where: { ownedVehicleId: id },
      orderBy: { dueDate: 'asc' },
    });

    res.json(reminders);
  } catch (error) {
    next(error);
  }
});

// Complete reminder
router.post('/reminders/:id/complete', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Verify ownership
    const reminder = await prisma.vehicleReminder.findFirst({
      where: { id, userId: req.userId! },
    });

    if (!reminder) {
      return res.status(404).json({ error: 'Reminder not found' });
    }

    const updated = await prisma.vehicleReminder.update({
      where: { id },
       {
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

export default router;
