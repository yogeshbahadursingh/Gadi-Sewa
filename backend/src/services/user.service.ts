import { prisma } from '../server';
import { AppError } from '../middleware/errorHandler';
import { UserRole } from '@prisma/client';

interface GetAllUsersParams {
  page: number;
  limit: number;
  role?: string;
  search?: string;
}

class UserService {
  // Get all users with pagination and filtering
  async getAllUsers(params: GetAllUsersParams) {
    const { page, limit, role, search } = params;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (role) {
      where.role = role;
    }

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          phone: true,
          fullName: true,
          role: true,
          avatar: true,
          emailVerified: true,
          phoneVerified: true,
          identityVerified: true,
          createdAt: true,
          lastLogin: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get user by ID
  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        phone: true,
        fullName: true,
        role: true,
        avatar: true,
        emailVerified: true,
        phoneVerified: true,
        identityVerified: true,
        createdAt: true,
        lastLogin: true,
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  // Update user profile
  async updateUser(id: string, data: any) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Check if email or phone is being changed and if it's already taken
    if (data.email && data.email !== user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });
      if (existingUser) {
        throw new AppError('Email already in use', 409);
      }
    }

    if (data.phone && data.phone !== user.phone) {
      const existingUser = await prisma.user.findUnique({
        where: { phone: data.phone },
      });
      if (existingUser) {
        throw new AppError('Phone number already in use', 409);
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        avatar: data.avatar,
      },
      select: {
        id: true,
        email: true,
        phone: true,
        fullName: true,
        role: true,
        avatar: true,
        emailVerified: true,
        phoneVerified: true,
        identityVerified: true,
        createdAt: true,
        lastLogin: true,
      },
    });

    return updatedUser;
  }

  // Update user role
  async updateUserRole(id: string, role: UserRole) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        email: true,
        phone: true,
        fullName: true,
        role: true,
        avatar: true,
        emailVerified: true,
        phoneVerified: true,
        identityVerified: true,
        createdAt: true,
        lastLogin: true,
      },
    });

    return updatedUser;
  }

  // Delete user
  async deleteUser(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Delete user and all related data
    await prisma.user.delete({
      where: { id },
    });

    return { message: 'User deleted successfully' };
  }
}

export const userService = new UserService();
