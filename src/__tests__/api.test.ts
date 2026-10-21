/**
 * Gadi-Sewa API Integration Tests
 * 
 * These tests verify the API client works correctly in demo mode.
 * Run with: npx vitest run src/__tests__/api.test.ts
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { api } from '../services/api';

describe('API Client - Demo Mode', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Authentication', () => {
    it('should register a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        phone: '+977-9800000000'
      };

      const result = await api.register(userData);
      
      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe(userData.email);
      expect(result.user.firstName).toBe(userData.firstName);
      expect(result.user.lastName).toBe(userData.lastName);
      expect(result.user).not.toHaveProperty('password');
    });

    it('should not register duplicate email', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
      };

      await api.register(userData);
      
      await expect(api.register(userData)).rejects.toThrow('Email already registered');
    });

    it('should login with valid credentials', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
      };

      await api.register(userData);
      await api.logout();
      
      const result = await api.login({
        email: userData.email,
        password: userData.password
      });
      
      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe(userData.email);
    });

    it('should not login with invalid credentials', async () => {
      await expect(api.login({
        email: 'nonexistent@example.com',
        password: 'wrongpassword'
      })).rejects.toThrow('Invalid credentials');
    });

    it('should logout successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
      };

      await api.register(userData);
      await api.logout();
      
      await expect(api.getCurrentUser()).rejects.toThrow('Not authenticated');
    });
  });

  describe('Vehicle Management', () => {
    beforeEach(async () => {
      // Register and login a user
      await api.register({
        email: 'seller@example.com',
        password: 'password123',
        firstName: 'Seller',
        lastName: 'User'
      });
    });

    it('should create a vehicle', async () => {
      const vehicleData = {
        category: 'CAR',
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        price: 2500000,
        negotiable: true,
        province: 'Bagmati',
        district: 'Kathmandu',
        city: 'Kathmandu',
        mileage: 50000,
        fuelType: 'PETROL',
        transmission: 'AUTOMATIC',
        condition: 'GOOD',
        description: 'Well maintained car'
      };

      const vehicle = await api.createVehicle(vehicleData);
      
      expect(vehicle).toHaveProperty('id');
      expect(vehicle.make).toBe(vehicleData.make);
      expect(vehicle.model).toBe(vehicleData.model);
      expect(vehicle.status).toBe('DRAFT');
      expect(vehicle.hasPassport).toBe(false);
    });

    it('should get my vehicles', async () => {
      await api.createVehicle({
        category: 'CAR',
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        price: 2500000,
        province: 'Bagmati',
        district: 'Kathmandu',
        city: 'Kathmandu'
      });

      await api.createVehicle({
        category: 'SUV',
        make: 'Hyundai',
        model: 'Creta',
        year: 2021,
        price: 3500000,
        province: 'Bagmati',
        district: 'Kathmandu',
        city: 'Kathmandu'
      });

      const vehicles = await api.getMyVehicles();
      
      expect(vehicles).toHaveLength(2);
      expect(vehicles[0].make).toBe('Hyundai'); // Most recent first
      expect(vehicles[1].make).toBe('Toyota');
    });

    it('should update a vehicle', async () => {
      const vehicle = await api.createVehicle({
        category: 'CAR',
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        price: 2500000,
        province: 'Bagmati',
        district: 'Kathmandu',
        city: 'Kathmandu'
      });

      const updated = await api.updateVehicle(vehicle.id, {
        price: 2700000,
        description: 'Updated description'
      });

      expect(updated.price).toBe(2700000);
      expect(updated.description).toBe('Updated description');
    });

    it('should not update someone else\'s vehicle', async () => {
      // Create vehicle as first user
      const vehicle = await api.createVehicle({
        category: 'CAR',
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        price: 2500000,
        province: 'Bagmati',
        district: 'Kathmandu',
        city: 'Kathmandu'
      });

      // Logout and login as different user
      await api.logout();
      await api.register({
        email: 'other@example.com',
        password: 'password123',
        firstName: 'Other',
        lastName: 'User'
      });

      // Try to update the vehicle
      await expect(api.updateVehicle(vehicle.id, {
        price: 3000000
      })).rejects.toThrow('Not authorized');
    });

    it('should delete a vehicle', async () => {
      const vehicle = await api.createVehicle({
        category: 'CAR',
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        price: 2500000,
        province: 'Bagmati',
        district: 'Kathmandu',
        city: 'Kathmandu'
      });

      await api.deleteVehicle(vehicle.id);
      
      const vehicles = await api.getMyVehicles();
      expect(vehicles).toHaveLength(0);
    });

    it('should publish a vehicle', async () => {
      const vehicle = await api.createVehicle({
        category: 'CAR',
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        price: 2500000,
        province: 'Bagmati',
        district: 'Kathmandu',
        city: 'Kathmandu'
      });

      expect(vehicle.status).toBe('DRAFT');

      const published = await api.publishVehicle(vehicle.id);
      
      expect(published.status).toBe('PUBLISHED');
    });

    it('should mark a vehicle as sold', async () => {
      const vehicle = await api.createVehicle({
        category: 'CAR',
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        price: 2500000,
        province: 'Bagmati',
        district: 'Kathmandu',
        city: 'Kathmandu'
      });

      const sold = await api.markAsSold(vehicle.id);
      
      expect(sold.status).toBe('SOLD');
    });
  });

  describe('Favourites', () => {
    beforeEach(async () => {
      await api.register({
        email: 'buyer@example.com',
        password: 'password123',
        firstName: 'Buyer',
        lastName: 'User'
      });
    });

    it('should add a vehicle to favourites', async () => {
      const vehicle = await api.createVehicle({
        category: 'CAR',
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        price: 2500000,
        province: 'Bagmati',
        district: 'Kathmandu',
        city: 'Kathmandu'
      });

      const favourite = await api.addFavourite(vehicle.id);
      
      expect(favourite).toHaveProperty('id');
      expect(favourite.vehicleId).toBe(vehicle.id);
    });

    it('should check if vehicle is favourite', async () => {
      const vehicle = await api.createVehicle({
        category: 'CAR',
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        price: 2500000,
        province: 'Bagmati',
        district: 'Kathmandu',
        city: 'Kathmandu'
      });

      expect(await api.isFavourite(vehicle.id)).toBe(false);
      
      await api.addFavourite(vehicle.id);
      
      expect(await api.isFavourite(vehicle.id)).toBe(true);
    });

    it('should remove a vehicle from favourites', async () => {
      const vehicle = await api.createVehicle({
        category: 'CAR',
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        price: 2500000,
        province: 'Bagmati',
        district: 'Kathmandu',
        city: 'Kathmandu'
      });

      await api.addFavourite(vehicle.id);
      expect(await api.isFavourite(vehicle.id)).toBe(true);
      
      await api.removeFavourite(vehicle.id);
      expect(await api.isFavourite(vehicle.id)).toBe(false);
    });

    it('should get all favourites', async () => {
      const vehicle1 = await api.createVehicle({
        category: 'CAR',
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        price: 2500000,
        province: 'Bagmati',
        district: 'Kathmandu',
        city: 'Kathmandu'
      });

      const vehicle2 = await api.createVehicle({
        category: 'SUV',
        make: 'Hyundai',
        model: 'Creta',
        year: 2021,
        price: 3500000,
        province: 'Bagmati',
        district: 'Kathmandu',
        city: 'Kathmandu'
      });

      await api.addFavourite(vehicle1.id);
      await api.addFavourite(vehicle2.id);

      const favourites = await api.getMyFavourites();
      
      expect(favourites).toHaveLength(2);
    });
  });

  describe('Enquiries', () => {
    beforeEach(async () => {
      await api.register({
        email: 'buyer@example.com',
        password: 'password123',
        firstName: 'Buyer',
        lastName: 'User'
      });
    });

    it('should create an enquiry', async () => {
      const vehicle = await api.createVehicle({
        category: 'CAR',
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        price: 2500000,
        province: 'Bagmati',
        district: 'Kathmandu',
        city: 'Kathmandu'
      });

      const enquiry = await api.createEnquiry(
        vehicle.id,
        'Is this still available?',
        2400000
      );
      
      expect(enquiry).toHaveProperty('id');
      expect(enquiry.vehicleId).toBe(vehicle.id);
      expect(enquiry.message).toBe('Is this still available?');
      expect(enquiry.offerAmount).toBe(2400000);
      expect(enquiry.status).toBe('NEW');
    });

    it('should get my enquiries', async () => {
      const vehicle = await api.createVehicle({
        category: 'CAR',
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        price: 2500000,
        province: 'Bagmati',
        district: 'Kathmandu',
        city: 'Kathmandu'
      });

      await api.createEnquiry(vehicle.id, 'Enquiry 1');
      await api.createEnquiry(vehicle.id, 'Enquiry 2');

      const enquiries = await api.getMyEnquiries();
      
      expect(enquiries).toHaveLength(2);
    });
  });

  describe('Profile Management', () => {
    beforeEach(async () => {
      await api.register({
        email: 'user@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
      });
    });

    it('should update profile', async () => {
      const updated = await api.updateProfile({
        firstName: 'Updated',
        lastName: 'Name',
        phone: '+977-9800000001'
      });
      
      expect(updated.firstName).toBe('Updated');
      expect(updated.lastName).toBe('Name');
      expect(updated.phone).toBe('+977-9800000001');
    });

    it('should change password', async () => {
      const result = await api.changePassword('password123', 'newpassword123');
      
      expect(result).toHaveProperty('message');
      
      // Verify new password works
      await api.logout();
      const loginResult = await api.login({
        email: 'user@example.com',
        password: 'newpassword123'
      });
      
      expect(loginResult).toHaveProperty('user');
    });

    it('should not change password with wrong current password', async () => {
      await expect(api.changePassword('wrongpassword', 'newpassword123'))
        .rejects.toThrow('Current password is incorrect');
    });
  });
});
