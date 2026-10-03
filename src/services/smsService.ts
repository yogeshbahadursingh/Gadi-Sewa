// Mock SMS Service - Can be replaced with real Twilio/Nepal SMS gateway integration
// This provides SMS sending functionality for testing and development

export interface SMSOptions {
  to: string;
  message: string;
  from?: string;
}

export interface SMSResponse {
  success: boolean;
  messageId: string;
  status: 'sent' | 'delivered' | 'failed';
  timestamp: string;
  cost?: number;
}

export interface SMSStatus {
  messageId: string;
  status: 'sent' | 'delivered' | 'failed';
  timestamp: string;
  to: string;
}

// Mock SMS storage (in production, this would be logged to a service)
const mockSMS: SMSOptions[] = [];

class SMSService {
  private defaultFrom = 'GadiBazar';

  /**
   * Send an SMS
   * In production, this would use Twilio or Nepal SMS gateway
   */
  async sendSMS(options: SMSOptions): Promise<SMSResponse> {
    // Validate phone number
    this.validatePhoneNumber(options.to);

    // Simulate API delay
    await this.simulateDelay(1000);

    const messageId = `SMS-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const sms: SMSOptions = {
      ...options,
      from: options.from || this.defaultFrom,
    };

    mockSMS.push(sms);

    console.log('📱 SMS sent (mock):', {
      to: options.to,
      message: options.message.substring(0, 50) + '...',
      messageId,
    });

    // Simulate 98% success rate
    const isSuccess = Math.random() > 0.02;

    return {
      success: isSuccess,
      messageId,
      status: isSuccess ? 'sent' : 'failed',
      timestamp: new Date().toISOString(),
      cost: 0.05, // Mock cost in USD
    };
  }

  /**
   * Send OTP (One-Time Password)
   */
  async sendOTP(phoneNumber: string): Promise<{ success: boolean; otp: string; messageId: string }> {
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    const message = `Your GadiBazar verification code is: ${otp}. Valid for 10 minutes. Do not share this code.`;
    
    const response = await this.sendSMS({
      to: phoneNumber,
      message,
    });

    // In production, store OTP with expiration in database/cache
    // For mock, we'll just return it (DON'T DO THIS IN PRODUCTION!)
    return {
      success: response.success,
      otp, // Only for testing - never return OTP in production!
      messageId: response.messageId,
    };
  }

  /**
   * Verify OTP
   * In production, this would check against stored OTP in database
   */
  async verifyOTP(phoneNumber: string, otp: string): Promise<boolean> {
    await this.simulateDelay(500);

    // Mock verification - in production, check against stored OTP
    // For testing, accept any 6-digit code
    return otp.length === 6 && /^\d{6}$/.test(otp);
  }

  /**
   * Send offer notification SMS
   */
  async sendOfferNotification(
    phoneNumber: string,
    buyerName: string,
    vehicleTitle: string,
    offerAmount: number
  ): Promise<SMSResponse> {
    const message = `New offer from ${buyerName} on ${vehicleTitle}: Rs. ${offerAmount.toLocaleString()}. View on GadiBazar.`;
    
    return this.sendSMS({
      to: phoneNumber,
      message,
    });
  }

  /**
   * Send inspection reminder SMS
   */
  async sendInspectionReminder(
    phoneNumber: string,
    vehicleTitle: string,
    inspectionDate: string
  ): Promise<SMSResponse> {
    const message = `Reminder: Inspection for ${vehicleTitle} scheduled on ${inspectionDate}. Please ensure vehicle is ready.`;
    
    return this.sendSMS({
      to: phoneNumber,
      message,
    });
  }

  /**
   * Send reservation confirmation SMS
   */
  async sendReservationConfirmation(
    phoneNumber: string,
    vehicleTitle: string,
    reservationId: string
  ): Promise<SMSResponse> {
    const message = `Reservation confirmed! ${vehicleTitle} is reserved for you. ID: ${reservationId}. View on GadiBazar.`;
    
    return this.sendSMS({
      to: phoneNumber,
      message,
    });
  }

  /**
   * Send payment confirmation SMS
   */
  async sendPaymentConfirmation(
    phoneNumber: string,
    amount: number,
    transactionId: string
  ): Promise<SMSResponse> {
    const message = `Payment successful! Rs. ${amount.toLocaleString()} received. Transaction ID: ${transactionId}. Thank you!`;
    
    return this.sendSMS({
      to: phoneNumber,
      message,
    });
  }

  /**
   * Send password reset SMS
   */
  async sendPasswordResetSMS(phoneNumber: string, resetCode: string): Promise<SMSResponse> {
    const message = `Your GadiBazar password reset code is: ${resetCode}. Valid for 10 minutes. Do not share this code.`;
    
    return this.sendSMS({
      to: phoneNumber,
      message,
    });
  }

  /**
   * Get SMS status
   */
  async getSMSStatus(messageId: string): Promise<SMSStatus> {
    await this.simulateDelay(300);

    const sms = mockSMS.find((s, index) => {
      const id = `SMS-${index}`;
      return id === messageId;
    });

    if (!sms) {
      throw new Error('SMS not found');
    }

    return {
      messageId,
      status: 'delivered',
      timestamp: new Date().toISOString(),
      to: sms.to,
    };
  }

  /**
   * Validate Nepal phone number
   */
  private validatePhoneNumber(phoneNumber: string): void {
    // Nepal phone numbers: 98XXXXXXXX (mobile) or 01-XXXXXXX (landline)
    const mobileRegex = /^98\d{8}$/;
    const landlineRegex = /^01-\d{7}$/;

    if (!mobileRegex.test(phoneNumber) && !landlineRegex.test(phoneNumber)) {
      throw new Error('Invalid phone number. Use format: 98XXXXXXXX or 01-XXXXXXX');
    }
  }

  /**
   * Simulate API delay
   */
  private simulateDelay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get all sent SMS (for testing/debugging)
   */
  getSentSMS(): SMSOptions[] {
    return [...mockSMS];
  }

  /**
   * Clear mock SMS (for testing)
   */
  clearMockData(): void {
    mockSMS.length = 0;
  }

  /**
   * Get SMS statistics
   */
  getStatistics(): { total: number; sent: number; failed: number } {
    return {
      total: mockSMS.length,
      sent: mockSMS.length, // Mock assumes all sent
      failed: 0,
    };
  }
}

export const smsService = new SMSService();
