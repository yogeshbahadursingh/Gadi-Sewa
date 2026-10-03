// Mock Payment Service - Can be replaced with real eSewa/Khalti integration
// This provides a complete payment flow for testing and development

export interface PaymentRequest {
  amount: number;
  purpose: string;
  userId: string;
  listingId?: string;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  amount: number;
  paymentMethod: string;
  timestamp: string;
  receipt?: string;
}

export interface PaymentStatus {
  transactionId: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  amount: number;
  paymentMethod: string;
  timestamp: string;
}

// Mock payment storage (in production, this would be a database)
const mockPayments: Map<string, PaymentResponse> = new Map();

class PaymentService {
  /**
   * Initialize a payment
   * In production, this would redirect to eSewa/Khalti payment gateway
   */
  async initializePayment(request: PaymentRequest): Promise<PaymentResponse> {
    // Simulate API delay
    await this.simulateDelay(1000);

    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const payment: PaymentResponse = {
      success: true,
      transactionId,
      status: 'pending',
      amount: request.amount,
      paymentMethod: 'mock',
      timestamp: new Date().toISOString(),
    };

    mockPayments.set(transactionId, payment);

    return payment;
  }

  /**
   * Process payment (mock implementation)
   * In production, this would be called by payment gateway webhook
   */
  async processPayment(transactionId: string): Promise<PaymentStatus> {
    await this.simulateDelay(2000);

    const payment = mockPayments.get(transactionId);
    if (!payment) {
      throw new Error('Transaction not found');
    }

    // Simulate 95% success rate
    const isSuccess = Math.random() > 0.05;

    payment.status = isSuccess ? 'completed' : 'failed';
    payment.timestamp = new Date().toISOString();

    mockPayments.set(transactionId, payment);

    return {
      transactionId: payment.transactionId,
      status: payment.status,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod,
      timestamp: payment.timestamp,
    };
  }

  /**
   * Check payment status
   */
  async getPaymentStatus(transactionId: string): Promise<PaymentStatus> {
    await this.simulateDelay(500);

    const payment = mockPayments.get(transactionId);
    if (!payment) {
      throw new Error('Transaction not found');
    }

    return {
      transactionId: payment.transactionId,
      status: payment.status,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod,
      timestamp: payment.timestamp,
    };
  }

  /**
   * Refund payment
   */
  async refundPayment(transactionId: string, reason?: string): Promise<PaymentStatus> {
    await this.simulateDelay(1500);

    const payment = mockPayments.get(transactionId);
    if (!payment) {
      throw new Error('Transaction not found');
    }

    if (payment.status !== 'completed') {
      throw new Error('Can only refund completed payments');
    }

    payment.status = 'refunded';
    payment.timestamp = new Date().toISOString();

    mockPayments.set(transactionId, payment);

    return {
      transactionId: payment.transactionId,
      status: payment.status,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod,
      timestamp: payment.timestamp,
    };
  }

  /**
   * Get payment receipt (mock)
   */
  async getPaymentReceipt(transactionId: string): Promise<string> {
    await this.simulateDelay(500);

    const payment = mockPayments.get(transactionId);
    if (!payment) {
      throw new Error('Transaction not found');
    }

    // Generate mock receipt URL
    return `https://api.gadibazar.com/receipts/${transactionId}`;
  }

  /**
   * Get all payments for a user
   */
  async getUserPayments(userId: string): Promise<PaymentStatus[]> {
    await this.simulateDelay(800);

    const userPayments: PaymentStatus[] = [];
    mockPayments.forEach((payment) => {
      // In real implementation, we'd filter by userId
      // For mock, we'll return all payments
      userPayments.push({
        transactionId: payment.transactionId,
        status: payment.status,
        amount: payment.amount,
        paymentMethod: payment.paymentMethod,
        timestamp: payment.timestamp,
      });
    });

    return userPayments;
  }

  /**
   * Verify payment signature (for webhook verification)
   * In production, this would verify eSewa/Khalti signatures
   */
  async verifyPaymentSignature(signature: string, data: any): Promise<boolean> {
    await this.simulateDelay(300);
    // Mock always returns true
    return true;
  }

  /**
   * Simulate API delay
   */
  private simulateDelay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Clear all mock payments (for testing)
   */
  clearMockData(): void {
    mockPayments.clear();
  }
}

export const paymentService = new PaymentService();
