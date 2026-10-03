// Mock Email Service - Can be replaced with real SendGrid/SMTP integration
// This provides email sending functionality for testing and development

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: EmailAttachment[];
}

export interface EmailAttachment {
  filename: string;
  content: string | Buffer;
  contentType?: string;
}

export interface EmailResponse {
  success: boolean;
  messageId: string;
  timestamp: string;
}

export interface EmailTemplate {
  name: string;
  subject: string;
  html: string;
  text: string;
}

// Mock email storage (in production, this would be logged to a service)
const mockEmails: EmailOptions[] = [];

class EmailService {
  private defaultFrom = 'noreply@gadibazar.com';

  /**
   * Send an email
   * In production, this would use SendGrid/SMTP
   */
  async sendEmail(options: EmailOptions): Promise<EmailResponse> {
    // Simulate API delay
    await this.simulateDelay(800);

    const messageId = `MSG-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const email: EmailOptions = {
      ...options,
      from: options.from || this.defaultFrom,
    };

    mockEmails.push(email);

    console.log('📧 Email sent (mock):', {
      to: options.to,
      subject: options.subject,
      messageId,
    });

    return {
      success: true,
      messageId,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Send email using a template
   */
  async sendTemplateEmail(
    templateName: string,
    to: string | string[],
    variables: Record<string, any>
  ): Promise<EmailResponse> {
    const template = this.getTemplate(templateName, variables);
    
    return this.sendEmail({
      to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }

  /**
   * Send welcome email to new user
   */
  async sendWelcomeEmail(email: string, userName: string): Promise<EmailResponse> {
    return this.sendTemplateEmail('welcome', email, { userName });
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(email: string, resetToken: string): Promise<EmailResponse> {
    const resetLink = `https://gadibazar.com/reset-password?token=${resetToken}`;
    return this.sendTemplateEmail('passwordReset', email, { resetLink });
  }

  /**
   * Send offer notification to seller
   */
  async sendOfferNotification(
    sellerEmail: string,
    buyerName: string,
    vehicleTitle: string,
    offerAmount: number
  ): Promise<EmailResponse> {
    return this.sendTemplateEmail('offerNotification', sellerEmail, {
      buyerName,
      vehicleTitle,
      offerAmount: this.formatCurrency(offerAmount),
    });
  }

  /**
   * Send inspection reminder
   */
  async sendInspectionReminder(
    email: string,
    vehicleTitle: string,
    inspectionDate: string,
    location: string
  ): Promise<EmailResponse> {
    return this.sendTemplateEmail('inspectionReminder', email, {
      vehicleTitle,
      inspectionDate,
      location,
    });
  }

  /**
   * Send reservation confirmation
   */
  async sendReservationConfirmation(
    email: string,
    vehicleTitle: string,
    reservationId: string,
    expiryDate: string
  ): Promise<EmailResponse> {
    return this.sendTemplateEmail('reservationConfirmation', email, {
      vehicleTitle,
      reservationId,
      expiryDate,
    });
  }

  /**
   * Send payment receipt
   */
  async sendPaymentReceipt(
    email: string,
    transactionId: string,
    amount: number,
    purpose: string
  ): Promise<EmailResponse> {
    return this.sendTemplateEmail('paymentReceipt', email, {
      transactionId,
      amount: this.formatCurrency(amount),
      purpose,
    });
  }

  /**
   * Get email template with variables replaced
   */
  private getTemplate(templateName: string, variables: Record<string, any>): EmailTemplate {
    const templates: Record<string, EmailTemplate> = {
      welcome: {
        name: 'welcome',
        subject: 'Welcome to GadiBazar!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Welcome to GadiBazar, ${variables.userName}!</h1>
            <p>Thank you for joining Nepal's trusted vehicle marketplace.</p>
            <p>You can now:</p>
            <ul>
              <li>Browse 120+ verified vehicles</li>
              <li>Make offers on vehicles you like</li>
              <li>Book inspections with certified inspectors</li>
              <li>Access complete vehicle history with Vehicle Passport</li>
            </ul>
            <p>Start exploring now: <a href="https://gadibazar.com/search">Browse Vehicles</a></p>
            <p>Best regards,<br>The GadiBazar Team</p>
          </div>
        `,
        text: `Welcome to GadiBazar, ${variables.userName}!\n\nThank you for joining Nepal's trusted vehicle marketplace.\n\nStart exploring: https://gadibazar.com/search`,
      },
      passwordReset: {
        name: 'passwordReset',
        subject: 'Reset Your GadiBazar Password',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Password Reset Request</h1>
            <p>You requested to reset your password. Click the link below:</p>
            <p><a href="${variables.resetLink}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Reset Password</a></p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
        `,
        text: `Reset your password: ${variables.resetLink}\n\nThis link will expire in 1 hour.`,
      },
      offerNotification: {
        name: 'offerNotification',
        subject: `New Offer on Your ${variables.vehicleTitle}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">New Offer Received!</h1>
            <p>${variables.buyerName} has made an offer on your vehicle: <strong>${variables.vehicleTitle}</strong></p>
            <p>Offer Amount: <strong style="color: #16a34a;">${variables.offerAmount}</strong></p>
            <p>View and respond to the offer: <a href="https://gadibazar.com/offers">View Offers</a></p>
          </div>
        `,
        text: `New offer from ${variables.buyerName} on ${variables.vehicleTitle}: ${variables.offerAmount}\n\nView offers: https://gadibazar.com/offers`,
      },
      inspectionReminder: {
        name: 'inspectionReminder',
        subject: `Inspection Reminder: ${variables.vehicleTitle}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Upcoming Inspection</h1>
            <p>This is a reminder for your vehicle inspection:</p>
            <ul>
              <li><strong>Vehicle:</strong> ${variables.vehicleTitle}</li>
              <li><strong>Date:</strong> ${variables.inspectionDate}</li>
              <li><strong>Location:</strong> ${variables.location}</li>
            </ul>
            <p>Please ensure the vehicle is ready and accessible at the scheduled time.</p>
          </div>
        `,
        text: `Inspection Reminder\n\nVehicle: ${variables.vehicleTitle}\nDate: ${variables.inspectionDate}\nLocation: ${variables.location}`,
      },
      reservationConfirmation: {
        name: 'reservationConfirmation',
        subject: `Reservation Confirmed: ${variables.vehicleTitle}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #16a34a;">Reservation Confirmed!</h1>
            <p>Your reservation has been confirmed:</p>
            <ul>
              <li><strong>Vehicle:</strong> ${variables.vehicleTitle}</li>
              <li><strong>Reservation ID:</strong> ${variables.reservationId}</li>
              <li><strong>Expires:</strong> ${variables.expiryDate}</li>
            </ul>
            <p>The vehicle is now reserved for you. Please complete the purchase before the expiry date.</p>
            <p>View your reservation: <a href="https://gadibazar.com/reservations">View Reservations</a></p>
          </div>
        `,
        text: `Reservation Confirmed\n\nVehicle: ${variables.vehicleTitle}\nReservation ID: ${variables.reservationId}\nExpires: ${variables.expiryDate}`,
      },
      paymentReceipt: {
        name: 'paymentReceipt',
        subject: `Payment Receipt - ${variables.transactionId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #16a34a;">Payment Successful</h1>
            <p>Thank you for your payment!</p>
            <ul>
              <li><strong>Transaction ID:</strong> ${variables.transactionId}</li>
              <li><strong>Amount:</strong> ${variables.amount}</li>
              <li><strong>Purpose:</strong> ${variables.purpose}</li>
              <li><strong>Date:</strong> ${new Date().toLocaleDateString()}</li>
            </ul>
            <p>This is your official receipt. Please keep it for your records.</p>
          </div>
        `,
        text: `Payment Receipt\n\nTransaction ID: ${variables.transactionId}\nAmount: ${variables.amount}\nPurpose: ${variables.purpose}\nDate: ${new Date().toLocaleDateString()}`,
      },
    };

    return templates[templateName] || templates.welcome;
  }

  /**
   * Format currency for display
   */
  private formatCurrency(amount: number): string {
    if (amount >= 10000000) {
      return `Rs. ${(amount / 10000000).toFixed(2)} Crore`;
    } else if (amount >= 100000) {
      return `Rs. ${(amount / 100000).toFixed(2)} Lakh`;
    }
    return `Rs. ${amount.toLocaleString()}`;
  }

  /**
   * Simulate API delay
   */
  private simulateDelay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get all sent emails (for testing/debugging)
   */
  getSentEmails(): EmailOptions[] {
    return [...mockEmails];
  }

  /**
   * Clear mock emails (for testing)
   */
  clearMockData(): void {
    mockEmails.length = 0;
  }
}

export const emailService = new EmailService();
