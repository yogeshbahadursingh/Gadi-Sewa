import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';
import { AppError } from './errorHandler';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface AuthRequest extends Request {
  userId?: string;
  userRoles?: string[];
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Authentication required', 401);
    }
    
    const token = authHeader.substring(7);
    
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    // Verify user exists and get roles
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { roles: true }
    });
    
    if (!user) {
      throw new AppError('User not found', 401);
    }
    
    req.userId = user.id;
    req.userRoles = user.roles.map(r => r.role);
    
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Invalid token', 401));
    } else {
      next(error);
    }
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.userId) {
      return next(new AppError('Authentication required', 401));
    }
    
    if (roles.length === 0) {
      return next();
    }
    
    const hasRole = req.userRoles?.some(role => roles.includes(role));
    
    if (!hasRole) {
      return next(new AppError('Insufficient permissions', 403));
    }
    
    next();
  };
};
