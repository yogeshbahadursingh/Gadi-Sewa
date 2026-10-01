import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { inspectionService } from '../services/inspection.service';

class InspectionController {
  // Get all inspections
  getAllInspections = asyncHandler(async (req: Request, res: Response) => {
    const { page = '1', limit = '10', status, vehicleId } = req.query;

    const result = await inspectionService.getAllInspections({
      page: Number(page),
      limit: Number(limit),
      status: status as string,
      vehicleId: vehicleId as string,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  // Get inspection by ID
  getInspectionById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const inspection = await inspectionService.getInspectionById(id);

    res.status(200).json({
      success: true,
      data: inspection,
    });
  });

  // Get my inspections (for inspectors)
  getMyInspections = asyncHandler(async (req: Request, res: Response) => {
    const inspectorId = req.user!.id;
    const { page = '1', limit = '10', status } = req.query;

    const result = await inspectionService.getMyInspections(inspectorId, {
      page: Number(page),
      limit: Number(limit),
      status: status as string,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  // Create inspection
  createInspection = asyncHandler(async (req: Request, res: Response) => {
    const inspectorId = req.user!.id;

    const inspection = await inspectionService.createInspection({
      ...req.body,
      inspectorId,
    });

    res.status(201).json({
      success: true,
      message: 'Inspection created successfully',
      data: inspection,
    });
  });

  // Update inspection
  updateInspection = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const userRole = req.user!.role;

    const inspection = await inspectionService.updateInspection(id, req.body, userId, userRole);

    res.status(200).json({
      success: true,
      message: 'Inspection updated successfully',
      data: inspection,
    });
  });
}

export const inspectionController = new InspectionController();
