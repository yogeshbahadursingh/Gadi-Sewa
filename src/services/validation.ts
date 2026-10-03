// Validation Service - Form validation utilities

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validationService = {
  // Email validation
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Phone validation (Nepal format)
  isValidPhone(phone: string): boolean {
    // Nepal phone: 98XXXXXXXX or 01-XXXXXXX
    const mobileRegex = /^98\d{8}$/;
    const landlineRegex = /^01-\d{7}$/;
    return mobileRegex.test(phone) || landlineRegex.test(phone);
  },

  // Password validation
  isValidPassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  // Required field validation
  isRequired(value: any, fieldName: string): string | null {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return `${fieldName} is required`;
    }
    return null;
  },

  // Number range validation
  isInRange(value: number, min: number, max: number, fieldName: string): string | null {
    if (value < min || value > max) {
      return `${fieldName} must be between ${min} and ${max}`;
    }
    return null;
  },

  // String length validation
  isLengthValid(value: string, min: number, max: number, fieldName: string): string | null {
    if (value.length < min || value.length > max) {
      return `${fieldName} must be between ${min} and ${max} characters`;
    }
    return null;
  },

  // URL validation
  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // Date validation
  isValidDate(date: string): boolean {
    const d = new Date(date);
    return d instanceof Date && !isNaN(d.getTime());
  },

  isFutureDate(date: string): boolean {
    const d = new Date(date);
    const now = new Date();
    return d > now;
  },

  isPastDate(date: string): boolean {
    const d = new Date(date);
    const now = new Date();
    return d < now;
  },

  // Price validation (Nepal context)
  isValidPrice(price: number): string | null {
    if (price < 0) {
      return 'Price cannot be negative';
    }
    if (price > 1000000000) {
      return 'Price seems too high. Please verify.';
    }
    return null;
  },

  // Mileage validation
  isValidMileage(mileage: number, vehicleYear: number): string | null {
    if (mileage < 0) {
      return 'Mileage cannot be negative';
    }
    
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - vehicleYear;
    const maxExpectedMileage = vehicleAge * 30000; // 30,000 km per year max
    
    if (mileage > maxExpectedMileage * 1.5) {
      return 'Mileage seems unusually high for vehicle age';
    }
    
    return null;
  },

  // Year validation
  isValidYear(year: number): string | null {
    const currentYear = new Date().getFullYear();
    
    if (year < 1950) {
      return 'Year seems too old';
    }
    if (year > currentYear + 1) {
      return 'Year cannot be in the future';
    }
    
    return null;
  },

  // File validation
  isValidFileType(file: File, allowedTypes: string[]): string | null {
    if (!allowedTypes.includes(file.type)) {
      return `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`;
    }
    return null;
  },

  isValidFileSize(file: File, maxSizeMB: number): string | null {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size exceeds ${maxSizeMB}MB limit`;
    }
    return null;
  },

  // Form validation helpers
  validateLoginForm(email: string, password: string): ValidationResult {
    const errors: Record<string, string> = {};

    const emailError = this.isRequired(email, 'Email') || 
                       (!this.isValidEmail(email) ? 'Invalid email format' : null);
    if (emailError) errors.email = emailError;

    const passwordError = this.isRequired(password, 'Password');
    if (passwordError) errors.password = passwordError;

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },

  validateRegisterForm(data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }): ValidationResult {
    const errors: Record<string, string> = {};

    // Full name
    const nameError = this.isRequired(data.fullName, 'Full name') ||
                      this.isLengthValid(data.fullName, 2, 100, 'Full name');
    if (nameError) errors.fullName = nameError;

    // Email
    const emailError = this.isRequired(data.email, 'Email') ||
                       (!this.isValidEmail(data.email) ? 'Invalid email format' : null);
    if (emailError) errors.email = emailError;

    // Phone
    const phoneError = this.isRequired(data.phone, 'Phone') ||
                       (!this.isValidPhone(data.phone) ? 'Invalid phone number (format: 98XXXXXXXX)' : null);
    if (phoneError) errors.phone = phoneError;

    // Password
    const passwordValidation = this.isValidPassword(data.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors[0];
    }

    // Confirm password
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },

  validateListingForm(data: {
    title: string;
    description: string;
    price: number;
    year: number;
    mileage: number;
  }): ValidationResult {
    const errors: Record<string, string> = {};

    // Title
    const titleError = this.isRequired(data.title, 'Title') ||
                       this.isLengthValid(data.title, 10, 200, 'Title');
    if (titleError) errors.title = titleError;

    // Description
    const descError = this.isRequired(data.description, 'Description') ||
                      this.isLengthValid(data.description, 50, 5000, 'Description');
    if (descError) errors.description = descError;

    // Price
    const priceError = this.isRequired(data.price, 'Price') ||
                       this.isValidPrice(data.price);
    if (priceError) errors.price = priceError;

    // Year
    const yearError = this.isRequired(data.year, 'Year') ||
                      this.isValidYear(data.year);
    if (yearError) errors.year = yearError;

    // Mileage
    const mileageError = this.isRequired(data.mileage, 'Mileage') ||
                         this.isValidMileage(data.mileage, data.year);
    if (mileageError) errors.mileage = mileageError;

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },

  validateContactForm(data: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }): ValidationResult {
    const errors: Record<string, string> = {};

    // Name
    const nameError = this.isRequired(data.name, 'Name') ||
                      this.isLengthValid(data.name, 2, 100, 'Name');
    if (nameError) errors.name = nameError;

    // Email
    const emailError = this.isRequired(data.email, 'Email') ||
                       (!this.isValidEmail(data.email) ? 'Invalid email format' : null);
    if (emailError) errors.email = emailError;

    // Phone (optional)
    if (data.phone) {
      const phoneError = !this.isValidPhone(data.phone) ? 'Invalid phone number' : null;
      if (phoneError) errors.phone = phoneError;
    }

    // Message
    const messageError = this.isRequired(data.message, 'Message') ||
                         this.isLengthValid(data.message, 10, 2000, 'Message');
    if (messageError) errors.message = messageError;

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};
