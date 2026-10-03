// External Services - Unified export for all external service integrations
// This module provides a single entry point for all external services

export { paymentService } from './paymentService';
export { emailService } from './emailService';
export { imageUploadService } from './imageUploadService';
export { smsService } from './smsService';

// Re-export types for convenience
export type { PaymentRequest, PaymentResponse, PaymentStatus } from './paymentService';
export type { EmailOptions, EmailResponse, EmailTemplate } from './emailService';
export type { UploadOptions, UploadResponse, ImageInfo, ImageTransformation } from './imageUploadService';
export type { SMSOptions, SMSResponse, SMSStatus } from './smsService';

/**
 * Service Configuration
 * In production, these would be loaded from environment variables
 */
export const serviceConfig = {
  payment: {
    provider: 'mock', // 'esewa' | 'khalti' | 'mock'
    sandbox: true,
    currency: 'NPR',
  },
  email: {
    provider: 'mock', // 'sendgrid' | 'smtp' | 'mock'
    fromEmail: 'noreply@gadibazar.com',
    fromName: 'GadiBazar',
  },
  imageUpload: {
    provider: 'mock', // 'cloudinary' | 'aws-s3' | 'mock'
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },
  sms: {
    provider: 'mock', // 'twilio' | 'nepal-sms' | 'mock'
    defaultFrom: 'GadiBazar',
  },
};

/**
 * Check if all services are properly configured
 */
export function validateServiceConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // In production, validate actual API keys and credentials
  // For mock services, always return valid
  if (serviceConfig.payment.provider === 'mock') {
    console.log('⚠️ Using mock payment service');
  }
  if (serviceConfig.email.provider === 'mock') {
    console.log('⚠️ Using mock email service');
  }
  if (serviceConfig.imageUpload.provider === 'mock') {
    console.log('⚠️ Using mock image upload service');
  }
  if (serviceConfig.sms.provider === 'mock') {
    console.log('⚠️ Using mock SMS service');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Initialize all services
 * Call this on app startup
 */
export async function initializeServices(): Promise<void> {
  console.log('🚀 Initializing external services...');
  
  const validation = validateServiceConfig();
  
  if (!validation.valid) {
    console.error('❌ Service configuration errors:', validation.errors);
    throw new Error('Service configuration invalid');
  }

  console.log('✅ All services initialized successfully');
}

/**
 * Clear all mock data (for testing)
 */
export function clearAllMockData(): void {
  console.log('🧹 Clearing all mock data...');
  
  // Import services dynamically to avoid circular dependencies
  import('./paymentService').then(({ paymentService }) => paymentService.clearMockData());
  import('./emailService').then(({ emailService }) => emailService.clearMockData());
  import('./imageUploadService').then(({ imageUploadService }) => imageUploadService.clearMockData());
  import('./smsService').then(({ smsService }) => smsService.clearMockData());
  
  console.log('✅ All mock data cleared');
}
