import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { dealerService } from '../services/dealer.service';

class DealerController {
  // Get all dealers
  getAllDealers = asyncHandler(async (req: Request, res: Response) => {
    const { page = '1', limit = '10', verified } = req.query;

    const result = await dealerService.getAllDealers({
      page: Number(page),
      limit: Number(limit),
      verified: verified === 'true',
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  // Get dealer by ID
  getDealerById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const dealer = await dealerService.getDealerById(id);

    res.status(200).json({
      success: true,
      data: dealer,
    });
  });

  // Get dealer's inventory
  getDealerInventory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { page = '1', limit = '10' } = req.query;

    const result = await dealerService.getDealerInventory(id, {
      page: Number(page),
      limit: Number(limit),
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  // Create dealer
  createDealer = asyncHandler(async (req: Request, res: Response) => {
    const dealer = await dealerService.createDealer(req.body);

    res.status(201).json({
      success: true,
      message: 'Dealer created successfully',
      data: dealer,
    });
  });

  // Update dealer
  updateDealer = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const userRole = req.user!.role;

    const dealer = await dealerService.updateDealer(id, req.body, userId, userRole);

    res.status(200).json({
      success: true,
      message: 'Dealer updated successfully',
      data: dealer,
    });
  });
}

export const dealerController = new DealerController();
