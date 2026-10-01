import { prisma } from '../server';
import { AppError } from '../middleware/errorHandler';
import { PaymentPurpose, PaymentProvider, PaymentStatus } from '@prisma/client';

interface CreatePaymentInput {
  userId: string;
  amount: number;
  purpose: PaymentPurpose;
  provider: PaymentProvider;
  reference?: string;
}

class PaymentService {
  // Generate unique reference
  private generateReference(provider: PaymentProvider): string {
    const timestamp = Date.now().toString().slice(-10);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const prefix = provider === 'ESEWA' ? 'ESW' : provider === 'KHALTI' ? 'KLT' : 'BNK';
    return `${prefix}-${timestamp}${random}`;
  }

  // Get all payments
  async getAllPayments(params: { page: number; limit: number; status?: string; userId?: string }) {
    const { page, limit, status, userId } = params;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (userId) {
      where.userId = userId;
    }

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              phone: true,
            },
          },
        },
      }),
      prisma.payment.count({ where }),
    ]);

    return {
      payments,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get payment by ID
  async getPaymentById(id: string) {
    const payment = await prisma.payment.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!payment) {
      throw new AppError('Payment not found', 404);
    }

    return payment;
  }

  // Get my payments
  async getMyPayments(userId: string, params: { page: number; limit: number; status?: string }) {
    const { page, limit, status } = params;
    const skip = (page - 1) * limit;

    const where: any = { userId };

    if (status) {
      where.status = status;
    }

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.payment.count({ where }),
    ]);

    return {
      payments,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Create payment
  async createPayment(input: CreatePaymentInput) {
    // Generate reference if not provided
    const reference = input.reference || this.generateReference(input.provider);

    // Create payment
    const payment = await prisma.payment.create({
      data: {
        userId: input.userId,
        amount: input.amount,
        purpose: input.purpose,
        provider: input.provider,
        reference,
        status: 'PENDING',
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return payment;
  }

  // Handle payment webhook
  async handleWebhook(provider: string, data: any) {
    // This is a placeholder for actual webhook handling
    // In production, you would verify the webhook signature and process the payment

    const { reference, status, transactionId } = data;

    // Find payment by reference
    const payment = await prisma.payment.findUnique({
      where: { reference },
    });

    if (!payment) {
      throw new AppError('Payment not found', 404);
    }

    // Update payment status
    const updatedPayment = await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: status === 'success' ? 'SUCCEEDED' : status === 'failed' ? 'FAILED' : 'PENDING',
        transactionId,
      },
    });

    return updatedPayment;
  }
}

export const paymentService = new PaymentService();
