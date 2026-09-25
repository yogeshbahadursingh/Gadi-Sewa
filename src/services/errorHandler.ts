// Error Handling Service - Centralized error management

export type ErrorSeverity = 'info' | 'warning' | 'error' | 'critical';

export interface AppError {
  code: string;
  message: string;
  severity: ErrorSeverity;
  timestamp: string;
  context?: Record<string, any>;
  stack?: string;
}

export class ErrorService {
  private static errors: AppError[] = [];
  private static maxErrors = 100;

  // Log error
  static log(error: Error | string, context?: Record<string, any>, severity: ErrorSeverity = 'error'): AppError {
    const appError: AppError = {
      code: this.generateErrorCode(),
      message: typeof error === 'string' ? error : error.message,
      severity,
      timestamp: new Date().toISOString(),
      context,
      stack: error instanceof Error ? error.stack : undefined,
    };

    this.errors.push(appError);

    // Keep only recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error(`[${severity.toUpperCase()}] ${appError.code}: ${appError.message}`, context);
      if (appError.stack) {
        console.error(appError.stack);
      }
    }

    // In production, send to error tracking service (e.g., Sentry)
    if (import.meta.env.PROD) {
      this.sendToErrorTracking(appError);
    }

    return appError;
  }

  // Log info
  static info(message: string, context?: Record<string, any>): AppError {
    return this.log(message, context, 'info');
  }

  // Log warning
  static warn(message: string, context?: Record<string, any>): AppError {
    return this.log(message, context, 'warning');
  }

  // Log critical error
  static critical(error: Error | string, context?: Record<string, any>): AppError {
    return this.log(error, context, 'critical');
  }

  // Get all errors
  static getErrors(): AppError[] {
    return [...this.errors];
  }

  // Get errors by severity
  static getErrorsBySeverity(severity: ErrorSeverity): AppError[] {
    return this.errors.filter(e => e.severity === severity);
  }

  // Clear errors
  static clear(): void {
    this.errors = [];
  }

  // Generate error code
  private static generateErrorCode(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7);
    return `ERR-${timestamp}-${random}`.toUpperCase();
  }

  // Send to error tracking service (placeholder for Sentry, etc.)
  private static sendToErrorTracking(error: AppError): void {
    // In production, integrate with Sentry, LogRocket, or similar
    // Example:
    // Sentry.captureException(error);
    
    // For now, just log to console
    console.log('Error tracking:', error);
  }

  // Handle API errors
  static handleApiError(error: any, context?: Record<string, any>): AppError {
    let message = 'An unexpected error occurred';
    
    if (error.response) {
      // Server responded with error
      message = error.response.data?.message || `Server error: ${error.response.status}`;
    } else if (error.request) {
      // Request made but no response
      message = 'Network error. Please check your connection.';
    } else if (error.message) {
      message = error.message;
    }

    return this.log(message, { ...context, originalError: error }, 'error');
  }

  // Handle validation errors
  static handleValidationError(errors: Record<string, string>, context?: Record<string, any>): AppError {
    const message = `Validation failed: ${Object.values(errors).join(', ')}`;
    return this.log(message, { ...context, validationErrors: errors }, 'warning');
  }

  // Handle authentication errors
  static handleAuthError(error: any, context?: Record<string, any>): AppError {
    const message = error.message || 'Authentication failed';
    return this.log(message, context, 'error');
  }

  // User-friendly error messages
  static getUserFriendlyMessage(error: AppError): string {
    const messages: Record<string, string> = {
      'network': 'Unable to connect to the server. Please check your internet connection.',
      'auth': 'You need to log in to perform this action.',
      'permission': 'You do not have permission to perform this action.',
      'not_found': 'The requested resource was not found.',
      'validation': 'Please check your input and try again.',
      'server': 'Something went wrong on our end. Please try again later.',
      'timeout': 'The request took too long. Please try again.',
    };

    // Try to match error to friendly message
    const lowerMessage = error.message.toLowerCase();
    for (const [key, friendlyMessage] of Object.entries(messages)) {
      if (lowerMessage.includes(key)) {
        return friendlyMessage;
      }
    }

    return error.message;
  }
}

// Error boundary helper
export const handleError = (error: Error, errorInfo?: any): void => {
  ErrorService.critical(error, { errorInfo });
};

// Async error handler
export const asyncHandler = <T>(
  fn: () => Promise<T>,
  errorMessage: string = 'An error occurred'
): Promise<T> => {
  return fn().catch(error => {
    ErrorService.handleApiError(error, { errorMessage });
    throw error;
  });
};

// Export singleton instance
export const errorService = ErrorService;
