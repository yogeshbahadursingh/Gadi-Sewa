import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';
import { registerSchema, loginSchema } from '../validators/auth';
import { AppError } from '../middleware/errorHandler';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

export class AuthService {
  async register(data: any) {
    const validated = registerSchema.parse(data);
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email }
    });
    
    if (existingUser) {
      throw new AppError('Email already registered', 400);
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(validated.password, 12);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email: validated.email,
        passwordHash,
        firstName: validated.firstName,
        lastName: validated.lastName,
        phone: validated.phone,
        roles: {
          create: {
            role: 'BUYER' // Default role
          }
        }
      },
      include: {
        roles: true
      }
    });
    
    // Generate token
    const token = this.generateToken(user.id);
    
    return {
      user: this.sanitizeUser(user),
      token
    };
  }
  
  async login(data: any) {
    const validated = loginSchema.parse(data);
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validated.email },
      include: { roles: true }
    });
    
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }
    
    // Verify password
    const isValid = await bcrypt.compare(validated.password, user.passwordHash);
    
    if (!isValid) {
      throw new AppError('Invalid credentials', 401);
    }
    
    // Generate token
    const token = this.generateToken(user.id);
    
    return {
      user: this.sanitizeUser(user),
      token
    };
  }
  
  async getUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: {
          include: {
            organization: true
          }
        },
        vehicles: {
          where: { status: 'PUBLISHED' },
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    return this.sanitizeUser(user);
  }
  
  async updateProfile(userId: string, data: any) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        avatar: data.avatar
      },
      include: { roles: true }
    });
    
    return this.sanitizeUser(user);
  }
  
  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
    
    if (!isValid) {
      throw new AppError('Current password is incorrect', 400);
    }
    
    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 12);
    
    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash }
    });
    
    return { message: 'Password changed successfully' };
  }
  
  private generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });
  }
  
  private sanitizeUser(user: any) {
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }
}

export const authService = new AuthService();
