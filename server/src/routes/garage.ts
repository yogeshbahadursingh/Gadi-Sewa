import { Router, Request, Response, NextFunction } from 'express';
import { garageService } from '../services/garage.service';
import { authenticate, AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const router = Router();

// Validation schemas
const addVehicleSchema = z.object({
  vehicleId: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  year: z.number().int().min(1900).max(2030).optional(),
  registrationNumber: z.string().optional(),
  vin: z.string().optional(),
  purchaseDate: z.string().optional(),
  purchasePrice: z.number().int().positive().optional(),
  currentMileage: z.number().int().min(0).optional(),
});

const updateVehicleSchema = z.object({
  currentMileage: z.number().int().min(0).optional(),
  status: z.enum(['ACTIVE', 'SOLD', 'INACTIVE']).optional(),
  registrationNumber: z.string().optional(),
  vin: z.string().optional(),
});

const addMaintenanceRecordSchema = z.object({
  serviceType: z.string().min(1),
  serviceDate: z.string(),
  mileageAtService: z.number().int().min(0).optional(),
  cost: z.number().int().min(0).optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
  photos: z.array(z.string()).optional(),
  invoices: z.array(z.string()).optional(),
  workshopId: z.string().optional(),
});

const addDocumentSchema = z.object({
  documentType: z.string(),
  title: z.string().min(1),
  documentNumber: z.string().optional(),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
  fileUrl: z.string().url(),
  fileSize: z.number().int().min(0).optional(),
});

const addExpenseSchema = z.object({
  expenseType: z.string(),
  amount: z.number().int().positive(),
  date: z.string(),
  description: z.string().optional(),
  vendor: z.string().optional(),
  receiptUrl: z.string().url().optional(),
});

const addReminderSchema = z.object({
  reminderType: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  mileageDue: z.number().int().min(0).optional(),
});

// Add vehicle to garage
router.post(
  '/vehicles',
  authenticate,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const validated = addVehicleSchema.parse(req.body);
      const vehicle = await garageService.addVehicleToGarage(
        req.userId!,
        validated
      );

      res.status(201).json({
        success: true,
         vehicle,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get all vehicles in garage
router.get(
  '/vehicles',
  authenticate,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const vehicles = await garageService.getUserVehicles(req.userId!);

      res.json({
        success: true,
         vehicles,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get garage statistics
router.get(
  '/stats',
  authenticate,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const stats = await garageService.getGarageStats(req.userId!);

      res.json({
        success: true,
         stats,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get owned vehicle by ID
router.get(
  '/vehicles/:id',
  authenticate,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const vehicle = await garageService.getOwnedVehicle(
        req.params.id,
        req.userId!
      );

      res.json({
        success: true,
         vehicle,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Update owned vehicle
router.put(
  '/vehicles/:id',
  authenticate,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const validated = updateVehicleSchema.parse(req.body);
      const vehicle = await garageService.updateOwnedVehicle(
        req.params.id,
        req.userId!,
        validated
      );

      res.json({
        success: true,
         vehicle,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Remove vehicle from garage
router.delete(
  '/vehicles/:id',
  authenticate,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = await garageService.removeVehicleFromGarage(
        req.params.id,
        req.userId!
      );

      res.json({
        success: true,
         result,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Add maintenance record
router.post(
  '/vehicles/:id/maintenance',
  authenticate,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const validated = addMaintenanceRecordSchema.parse(req.body);
      const record = await garageService.addMaintenanceRecord(
        req.params.id,
        req.userId!,
        validated
      );

      res.status(201).json({
        success: true,
         record,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get maintenance records
router.get(
  '/vehicles/:id/maintenance',
  authenticate,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const records = await garageService.getMaintenanceRecords(
        req.params.id,
        req.userId!
      );

      res.json({
        success: true,
         records,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Add document
router.post(
  '/vehicles/:id/documents',
  authenticate,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const validated = addDocumentSchema.parse(req.body);
      const document = await garageService.addDocument(
        req.params.id,
        req.userId!,
        validated
      );

      res.status(201).json({
        success: true,
         document,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get documents
router.get(
  '/vehicles/:id/documents',
  authenticate,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const documents = await garageService.getDocuments(
        req.params.id,
        req.userId!
      );

      res.json({
        success: true,
         documents,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Add expense
router.post(
  '/vehicles/:id/expenses',
  authenticate,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const validated = addExpenseSchema.parse(req.body);
      const expense = await garageService.addExpense(
        req.params.id,
        req.userId!,
        validated
      );

      res.status(201).json({
        success: true,
         expense,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get expenses
router.get(
  '/vehicles/:id/expenses',
  authenticate,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const expenses = await garageService.getExpenses(
        req.params.id,
        req.userId!
      );

      res.json({
        success: true,
         expenses,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Add reminder
router.post(
  '/vehicles/:id/reminders',
  authenticate,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const validated = addReminderSchema.parse(req.body);
      const reminder = await garageService.addReminder(
        req.params.id,
        req.userId!,
        validated
      );

      res.status(201).json({
        success: true,
         reminder,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get reminders
router.get(
  '/vehicles/:id/reminders',
  authenticate,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const reminders = await garageService.getReminders(
        req.params.id,
        req.userId!
      );

      res.json({
        success: true,
         reminders,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Complete reminder
router.post(
  '/reminders/:id/complete',
  authenticate,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const reminder = await garageService.completeReminder(
        req.params.id,
        req.userId!
      );

      res.json({
        success: true,
         reminder,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
