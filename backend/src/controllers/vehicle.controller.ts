import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { vehicleService } from '../services/vehicle.service';

class VehicleController {
  // Get all vehicles
  getAllVehicles = asyncHandler(async (req: Request, res: Response) => {
    const { page = '1', limit = '10', type, make, model, year, fuelType, isEV } = req.query;

    const result = await vehicleService.getAllVehicles({
      page: Number(page),
      limit: Number(limit),
      type: type as string,
      make: make as string,
      model: model as string,
      year: year ? Number(year) : undefined,
      fuelType: fuelType as string,
      isEV: isEV === 'true',
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  // Get vehicle by ID
  getVehicleById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const vehicle = await vehicleService.getVehicleById(id);

    res.status(200).json({
      success: true,
      data: vehicle,
    });
  });

  // Get vehicle by passport ID
  getVehicleByPassportId = asyncHandler(async (req: Request, res: Response) => {
    const { passportId } = req.params;

    const vehicle = await vehicleService.getVehicleByPassportId(passportId);

    res.status(200).json({
      success: true,
      data: vehicle,
    });
  });

  // Create vehicle
  createVehicle = asyncHandler(async (req: Request, res: Response) => {
    const ownerId = req.user!.id;

    const vehicle = await vehicleService.createVehicle({
      ...req.body,
      ownerId,
    });

    res.status(201).json({
      success: true,
      message: 'Vehicle created successfully',
      data: vehicle,
    });
  });

  // Update vehicle
  updateVehicle = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const userRole = req.user!.role;

    const vehicle = await vehicleService.updateVehicle(id, req.body, userId, userRole);

    res.status(200).json({
      success: true,
      message: 'Vehicle updated successfully',
      data: vehicle,
    });
  });

  // Delete vehicle
  deleteVehicle = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const userRole = req.user!.role;

    await vehicleService.deleteVehicle(id, userId, userRole);

    res.status(200).json({
      success: true,
      message: 'Vehicle deleted successfully',
    });
  });
}

export const vehicleController = new VehicleController();
