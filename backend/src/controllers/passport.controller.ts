import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { passportService } from '../services/passport.service';

class PassportController {
  // Get all passports
  getAllPassports = asyncHandler(async (req: Request, res: Response) => {
    const { page = '1', limit = '10' } = req.query;

    const result = await passportService.getAllPassports({
      page: Number(page),
      limit: Number(limit),
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  // Get passport by passport ID
  getPassportByPassportId = asyncHandler(async (req: Request, res: Response) => {
    const { passportId } = req.params;

    const passport = await passportService.getPassportByPassportId(passportId);

    res.status(200).json({
      success: true,
      data: passport,
    });
  });

  // Get passport by vehicle ID
  getPassportByVehicleId = asyncHandler(async (req: Request, res: Response) => {
    const { vehicleId } = req.params;

    const passport = await passportService.getPassportByVehicleId(vehicleId);

    res.status(200).json({
      success: true,
      data: passport,
    });
  });
}

export const passportController = new PassportController();
