import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { reservationService } from '../services/reservation.service';

class ReservationController {
  // Get all reservations
  getAllReservations = asyncHandler(async (req: Request, res: Response) => {
    const { page = '1', limit = '10', status } = req.query;

    const result = await reservationService.getAllReservations({
      page: Number(page),
      limit: Number(limit),
      status: status as string,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  // Get reservation by ID
  getReservationById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const reservation = await reservationService.getReservationById(id);

    res.status(200).json({
      success: true,
      data: reservation,
    });
  });

  // Get my reservations
  getMyReservations = asyncHandler(async (req: Request, res: Response) => {
    const buyerId = req.user!.id;
    const { page = '1', limit = '10', status } = req.query;

    const result = await reservationService.getMyReservations(buyerId, {
      page: Number(page),
      limit: Number(limit),
      status: status as string,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  // Create reservation
  createReservation = asyncHandler(async (req: Request, res: Response) => {
    const buyerId = req.user!.id;

    const reservation = await reservationService.createReservation({
      ...req.body,
      buyerId,
    });

    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      data: reservation,
    });
  });

  // Update reservation
  updateReservation = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const userRole = req.user!.role;

    const reservation = await reservationService.updateReservation(id, req.body, userId, userRole);

    res.status(200).json({
      success: true,
      message: 'Reservation updated successfully',
      data: reservation,
    });
  });
}

export const reservationController = new ReservationController();
