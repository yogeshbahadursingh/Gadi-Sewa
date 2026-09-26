import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { listingService } from '../services/listing.service';

class ListingController {
  // Get all listings
  getAllListings = asyncHandler(async (req: Request, res: Response) => {
    const { page = '1', limit = '10', status, district, make, model, minPrice, maxPrice, isEV, isInspected, hasPassport } = req.query;

    const result = await listingService.getAllListings({
      page: Number(page),
      limit: Number(limit),
      status: status as string,
      district: district as string,
      make: make as string,
      model: model as string,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      isEV: isEV === 'true',
      isInspected: isInspected === 'true',
      hasPassport: hasPassport === 'true',
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  // Get listing by ID
  getListingById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const listing = await listingService.getListingById(id);

    res.status(200).json({
      success: true,
      data: listing,
    });
  });

  // Get my listings
  getMyListings = asyncHandler(async (req: Request, res: Response) => {
    const sellerId = req.user!.id;
    const { page = '1', limit = '10', status } = req.query;

    const result = await listingService.getMyListings(sellerId, {
      page: Number(page),
      limit: Number(limit),
      status: status as string,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  // Create listing
  createListing = asyncHandler(async (req: Request, res: Response) => {
    const sellerId = req.user!.id;

    const listing = await listingService.createListing({
      ...req.body,
      sellerId,
    });

    res.status(201).json({
      success: true,
      message: 'Listing created successfully',
      data: listing,
    });
  });

  // Update listing
  updateListing = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const userRole = req.user!.role;

    const listing = await listingService.updateListing(id, req.body, userId, userRole);

    res.status(200).json({
      success: true,
      message: 'Listing updated successfully',
      data: listing,
    });
  });

  // Delete listing
  deleteListing = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const userRole = req.user!.role;

    await listingService.deleteListing(id, userId, userRole);

    res.status(200).json({
      success: true,
      message: 'Listing deleted successfully',
    });
  });

  // Mark as sold
  markAsSold = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const userRole = req.user!.role;

    const listing = await listingService.markAsSold(id, userId, userRole);

    res.status(200).json({
      success: true,
      message: 'Listing marked as sold',
      data: listing,
    });
  });
}

export const listingController = new ListingController();
