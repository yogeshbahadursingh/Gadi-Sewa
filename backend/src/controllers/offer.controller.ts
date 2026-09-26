import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { offerService } from '../services/offer.service';

class OfferController {
  // Get all offers
  getAllOffers = asyncHandler(async (req: Request, res: Response) => {
    const { page = '1', limit = '10', status, listingId } = req.query;

    const result = await offerService.getAllOffers({
      page: Number(page),
      limit: Number(limit),
      status: status as string,
      listingId: listingId as string,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  // Get offer by ID
  getOfferById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const offer = await offerService.getOfferById(id);

    res.status(200).json({
      success: true,
      data: offer,
    });
  });

  // Get my offers as buyer
  getMyOffersAsBuyer = asyncHandler(async (req: Request, res: Response) => {
    const buyerId = req.user!.id;
    const { page = '1', limit = '10', status } = req.query;

    const result = await offerService.getMyOffersAsBuyer(buyerId, {
      page: Number(page),
      limit: Number(limit),
      status: status as string,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  // Get received offers as seller
  getReceivedOffersAsSeller = asyncHandler(async (req: Request, res: Response) => {
    const sellerId = req.user!.id;
    const { page = '1', limit = '10', status } = req.query;

    const result = await offerService.getReceivedOffersAsSeller(sellerId, {
      page: Number(page),
      limit: Number(limit),
      status: status as string,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  // Create offer
  createOffer = asyncHandler(async (req: Request, res: Response) => {
    const buyerId = req.user!.id;

    const offer = await offerService.createOffer({
      ...req.body,
      buyerId,
    });

    res.status(201).json({
      success: true,
      message: 'Offer created successfully',
      data: offer,
    });
  });

  // Update offer
  updateOffer = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const userRole = req.user!.role;

    const offer = await offerService.updateOffer(id, req.body, userId, userRole);

    res.status(200).json({
      success: true,
      message: 'Offer updated successfully',
      data: offer,
    });
  });
}

export const offerController = new OfferController();
