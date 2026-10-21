/**
 * Backend API Logic Tests
 * 
 * These tests verify the backend service logic works correctly
 * using mocked database operations.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import bcrypt from 'bcryptjs';

// Mock Prisma client
const mockPrisma = {
  user: {
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
  vehicle: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  },
  favourite: {
    findFirst: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
    findMany: vi.fn(),
  },
  enquiry: {
    create: vi.fn(),
    findMany: vi.fn(),
  },
};

// Mock the database module
vi.mock('../config/database', () => ({
  prisma: mockPrisma,
}));

// Import services after mocking
import { AuthService } from '../services/auth.service';
import { VehicleService } from '../services/vehicle.service';

describe('Backend API Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('AuthService', () => {
    const authService = new AuthService();

    describe('register', () => {
      it('should hash password and create user', async () => {
        const userData = {
          email: 'test@example.com',
          password: 'password123',
          firstName: 'Test',
          lastName: 'User',
        };

        mockPrisma.user.findUnique.mockResolvedValue(null);
        mockPrisma.user.create.mockResolvedValue({
          id: 'user-1',
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          passwordHash: 'hashed-password',
          roles: [{ role: 'BUYER' }],
        });

        const result = await authService.register(userData);

        expect(result.user.email).toBe(userData.email);
        expect(result.user).not.toHaveProperty('passwordHash');
        expect(result.token).toBeDefined();
        expect(mockPrisma.user.create).toHaveBeenCalled();
      });

      it('should throw error if email already exists', async () => {
        const userData = {
          email: 'existing@example.com',
          password: 'password123',
          firstName: 'Test',
          lastName: 'User',
        };

        mockPrisma.user.findUnique.mockResolvedValue({
          id: 'user-1',
          email: userData.email,
        });

        await expect(authService.register(userData)).rejects.toThrow(
          'Email already registered'
        );
      });
    });

    describe('login', () => {
      it('should verify password and return token', async () => {
        const userData = {
          email: 'test@example.com',
          password: 'password123',
        };

        const hashedPassword = await bcrypt.hash('password123', 12);

        mockPrisma.user.findUnique.mockResolvedValue({
          id: 'user-1',
          email: userData.email,
          passwordHash: hashedPassword,
          roles: [{ role: 'BUYER' }],
        });

        const result = await authService.login(userData);

        expect(result.user.email).toBe(userData.email);
        expect(result.token).toBeDefined();
      });

      it('should throw error for invalid credentials', async () => {
        const userData = {
          email: 'test@example.com',
          password: 'wrongpassword',
        };

        mockPrisma.user.findUnique.mockResolvedValue(null);

        await expect(authService.login(userData)).rejects.toThrow(
          'Invalid credentials'
        );
      });
    });
  });

  describe('VehicleService', () => {
    const vehicleService = new VehicleService();

    describe('create', () => {
      it('should create vehicle with seller ID', async () => {
        const sellerId = 'seller-1';
        const vehicleData = {
          category: 'CAR',
          make: 'Toyota',
          model: 'Corolla',
          year: 2020,
          price: 2500000,
          province: 'Bagmati',
          district: 'Kathmandu',
          city: 'Kathmandu',
        };

        mockPrisma.vehicle.create.mockResolvedValue({
          id: 'vehicle-1',
          sellerId,
          status: 'DRAFT',
          ...vehicleData,
        });

        const result = await vehicleService.create(sellerId, vehicleData);

        expect(result.sellerId).toBe(sellerId);
        expect(result.status).toBe('DRAFT');
        expect(mockPrisma.vehicle.create).toHaveBeenCalledWith({
          data: expect.objectContaining({
            sellerId,
            status: 'DRAFT',
          }),
        });
      });
    });

    describe('update', () => {
      it('should only allow owner to update', async () => {
        const vehicleId = 'vehicle-1';
        const ownerId = 'owner-1';
        const otherUserId = 'other-1';

        mockPrisma.vehicle.findUnique.mockResolvedValue({
          id: vehicleId,
          sellerId: ownerId,
        });

        await expect(
          vehicleService.update(vehicleId, otherUserId, { price: 3000000 })
        ).rejects.toThrow('Not authorized');
      });

      it('should allow owner to update', async () => {
        const vehicleId = 'vehicle-1';
        const ownerId = 'owner-1';

        mockPrisma.vehicle.findUnique.mockResolvedValue({
          id: vehicleId,
          sellerId: ownerId,
        });

        mockPrisma.vehicle.update.mockResolvedValue({
          id: vehicleId,
          sellerId: ownerId,
          price: 3000000,
        });

        const result = await vehicleService.update(vehicleId, ownerId, {
          price: 3000000,
        });

        expect(result.price).toBe(3000000);
      });
    });

    describe('delete', () => {
      it('should only allow owner to delete', async () => {
        const vehicleId = 'vehicle-1';
        const ownerId = 'owner-1';
        const otherUserId = 'other-1';

        mockPrisma.vehicle.findUnique.mockResolvedValue({
          id: vehicleId,
          sellerId: ownerId,
        });

        await expect(
          vehicleService.delete(vehicleId, otherUserId)
        ).rejects.toThrow('Not authorized');
      });

      it('should allow owner to delete', async () => {
        const vehicleId = 'vehicle-1';
        const ownerId = 'owner-1';

        mockPrisma.vehicle.findUnique.mockResolvedValue({
          id: vehicleId,
          sellerId: ownerId,
        });

        mockPrisma.vehicle.delete.mockResolvedValue({ id: vehicleId });

        const result = await vehicleService.delete(vehicleId, ownerId);

        expect(result.message).toBe('Vehicle deleted successfully');
        expect(mockPrisma.vehicle.delete).toHaveBeenCalledWith({
          where: { id: vehicleId },
        });
      });
    });

    describe('getAll', () => {
      it('should filter by category', async () => {
        const filters = { category: 'CAR' };

        mockPrisma.vehicle.findMany.mockResolvedValue([]);
        mockPrisma.vehicle.count.mockResolvedValue(0);

        await vehicleService.getAll(filters);

        expect(mockPrisma.vehicle.findMany).toHaveBeenCalledWith(
          expect.objectContaining({
            where: expect.objectContaining({
              category: 'CAR',
            }),
          })
        );
      });

      it('should filter by price range', async () => {
        const filters = { minPrice: 1000000, maxPrice: 3000000 };

        mockPrisma.vehicle.findMany.mockResolvedValue([]);
        mockPrisma.vehicle.count.mockResolvedValue(0);

        await vehicleService.getAll(filters);

        expect(mockPrisma.vehicle.findMany).toHaveBeenCalledWith(
          expect.objectContaining({
            where: expect.objectContaining({
              price: {
                gte: 1000000,
                lte: 3000000,
              },
            }),
          })
        );
      });

      it('should filter by passport status', async () => {
        const filters = { hasPassport: true };

        mockPrisma.vehicle.findMany.mockResolvedValue([]);
        mockPrisma.vehicle.count.mockResolvedValue(0);

        await vehicleService.getAll(filters);

        expect(mockPrisma.vehicle.findMany).toHaveBeenCalledWith(
          expect.objectContaining({
            where: expect.objectContaining({
              passport: {
                isNot: null,
                status: 'PUBLISHED',
              },
            }),
          })
        );
      });

      it('should sort by price ascending', async () => {
        const filters = { sortBy: 'price_asc' };

        mockPrisma.vehicle.findMany.mockResolvedValue([]);
        mockPrisma.vehicle.count.mockResolvedValue(0);

        await vehicleService.getAll(filters);

        expect(mockPrisma.vehicle.findMany).toHaveBeenCalledWith(
          expect.objectContaining({
            orderBy: { price: 'asc' },
          })
        );
      });

      it('should paginate results', async () => {
        const filters = { page: 2, limit: 10 };

        mockPrisma.vehicle.findMany.mockResolvedValue([]);
        mockPrisma.vehicle.count.mockResolvedValue(25);

        const result = await vehicleService.getAll(filters);

        expect(mockPrisma.vehicle.findMany).toHaveBeenCalledWith(
          expect.objectContaining({
            skip: 10,
            take: 10,
          })
        );
        expect(result.pagination.page).toBe(2);
        expect(result.pagination.totalPages).toBe(3);
      });
    });
  });
});
