import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { paymentService } from '../services/payment.service';

class PaymentController {
  // Get all payments (admin only)
  getAllPayments = asyncHandler(async (req: Request, res: Response) => {
    const { page = '1', limit = '10', status, userId } = req.query;

    const result = await paymentService.getAllPayments({
      page: Number(page),
      limit: Number(limit),
      status: status as string,
      userId: userId as string,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  // Get payment by ID
  getPaymentById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const payment = await paymentService.getPaymentById(id);

    res.status(200).json({
      success: true,
      data: payment,
    });
  });

  // Get my payments
  getMyPayments = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { page = '1', limit = '10', status } = req.query;

    const result = await paymentService.getMyPayments(userId, {
      page: Number(page),
      limit: Number(limit),
      status: status as string,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  // Create payment
  createPayment = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const payment = await paymentService.createPayment({
      ...req.body,
      userId,
    });

    res.status(201).json({
      success: true,
      message: 'Payment created successfully',
      data: payment,
    });
  });

  // Handle payment webhook
  handleWebhook = asyncHandler(async (req: Request, res: Response) => {
    const { provider } = req.params;

    const result = await paymentService.handleWebhook(provider, req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  });
}

export const paymentController = new PaymentController();
