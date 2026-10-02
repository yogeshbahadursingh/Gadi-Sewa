// Unified Data Service - Abstracts data source (mock or API)
import { users, vehicles, listings, vehiclePassports, inspections, offers, reservations, payments, dealers, getUserById, getVehicleById, getListingById } from '../store/data';
import type { User, Vehicle, Listing, VehiclePassport, Inspection, Offer, Reservation, Payment, Dealer, SearchFilters } from '../types';

const DATA_SOURCE = ((import.meta as any).env?.VITE_DATA_SOURCE || 'mock') as 'mock' | 'api';
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api/v1';
const simulateDelay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('auth_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Helper function to handle API errors
const handleApiError = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

// ============ VEHICLE SERVICE ============
export const vehicleService = {
  async getAll(filters?: SearchFilters) {
    if (DATA_SOURCE === 'api') {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            params.append(key, String(value));
          }
        });
      }
      const response = await fetch(`${API_BASE_URL}/vehicles?${params}`, {
        headers: getAuthHeaders(),
      });
      return handleApiError(response);
    }
    await simulateDelay();
    let result = [...vehicles];
    if (filters?.make) result = result.filter(v => v.make === filters.make);
    if (filters?.vehicleType) result = result.filter(v => v.type === filters.vehicleType);
    if (filters?.isEV !== undefined) result = result.filter(v => v.isEV === filters.isEV);
    return { success: true, result };
  },

  async getById(id: string) {
    if (DATA_SOURCE === 'api') {
      const response = await fetch(`${API_BASE_URL}/vehicles/${id}`, {
        headers: getAuthHeaders(),
      });
      return handleApiError(response);
    }
    await simulateDelay();
    return { success: true, result: getVehicleById(id) || null };
  },
};

// ============ LISTING SERVICE ============
export const listingService = {
  async getAll(filters?: SearchFilters, page = 1, limit = 20) {
    if (DATA_SOURCE === 'api') {
      const params = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (filters) {
        Object.entries(filters).forEach(([k, v]) => {
          if (v !== undefined && v !== null && v !== '') {
            params.append(k, String(v));
          }
        });
      }
      const response = await fetch(`${API_BASE_URL}/listings?${params}`, {
        headers: getAuthHeaders(),
      });
      return handleApiError(response);
    }
    await simulateDelay();
    let result = listings.filter(l => l.status === 'ACTIVE');
    if (filters?.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(l => {
        const v = getVehicleById(l.vehicleId);
        return l.title.toLowerCase().includes(q) || v?.make.toLowerCase().includes(q) || v?.model.toLowerCase().includes(q);
      });
    }
    if (filters?.make) result = result.filter(l => getVehicleById(l.vehicleId)?.make === filters.make);
    if (filters?.district) result = result.filter(l => l.district === filters.district);
    if (filters?.priceMin) result = result.filter(l => l.price >= filters.priceMin!);
    if (filters?.priceMax) result = result.filter(l => l.price <= filters.priceMax!);
    if (filters?.isEV !== undefined) result = result.filter(l => getVehicleById(l.vehicleId)?.isEV === filters.isEV);
    if (filters?.isInspected) result = result.filter(l => l.isInspected);
    if (filters?.hasPassport) result = result.filter(l => l.hasPassport);
    
    const total = result.length;
    const paginated = result.slice((page - 1) * limit, page * limit);
    return { success: true, result: paginated, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  },

  async getById(id: string) {
    if (DATA_SOURCE === 'api') {
      const response = await fetch(`${API_BASE_URL}/listings/${id}`, {
        headers: getAuthHeaders(),
      });
      return handleApiError(response);
    }
    await simulateDelay();
    return { success: true, result: getListingById(id) || null };
  },

  async getBySeller(sellerId: string) {
    if (DATA_SOURCE === 'api') {
      const response = await fetch(`${API_BASE_URL}/listings/seller/${sellerId}`, {
        headers: getAuthHeaders(),
      });
      return handleApiError(response);
    }
    await simulateDelay();
    return { success: true, result: listings.filter(l => l.sellerId === sellerId) };
  },
};

// ============ PASSPORT SERVICE ============
export const passportService = {
  async getByPassportId(passportId: string) {
    if (DATA_SOURCE === 'api') {
      const response = await fetch(`${API_BASE_URL}/passports/${passportId}`, {
        headers: getAuthHeaders(),
      });
      return handleApiError(response);
    }
    await simulateDelay();
    return { success: true, result: vehiclePassports.find(p => p.passportId === passportId) || null };
  },

  async getByVehicleId(vehicleId: string) {
    if (DATA_SOURCE === 'api') {
      const response = await fetch(`${API_BASE_URL}/passports/vehicle/${vehicleId}`, {
        headers: getAuthHeaders(),
      });
      return handleApiError(response);
    }
    await simulateDelay();
    return { success: true, result: vehiclePassports.find(p => p.vehicleId === vehicleId) || null };
  },
};

// ============ INSPECTION SERVICE ============
export const inspectionService = {
  async getById(id: string) {
    if (DATA_SOURCE === 'api') {
      const response = await fetch(`${API_BASE_URL}/inspections/${id}`);
      return response.json();
    }
    await simulateDelay();
    return { success: true, result: inspections.find(i => i.id === id) || null };
  },

  async getByVehicle(vehicleId: string) {
    if (DATA_SOURCE === 'api') {
      const response = await fetch(`${API_BASE_URL}/inspections/vehicle/${vehicleId}`);
      return response.json();
    }
    await simulateDelay();
    return { success: true, result: inspections.filter(i => i.vehicleId === vehicleId) };
  },
};

// ============ OFFER SERVICE ============
export const offerService = {
  async create(offerData: Partial<Offer>) {
    if (DATA_SOURCE === 'api') {
      const response = await fetch(`${API_BASE_URL}/offers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offerData),
      });
      return response.json();
    }
    await simulateDelay();
    const newOffer: Offer = {
      id: `o${Date.now()}`,
      listingId: offerData.listingId || '',
      buyerId: offerData.buyerId || '',
      sellerId: offerData.sellerId || '',
      amount: offerData.amount || 0,
      message: offerData.message,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return { success: true, result: newOffer, message: 'Offer submitted' };
  },

  async getByUser(userId: string) {
    if (DATA_SOURCE === 'api') {
      const response = await fetch(`${API_BASE_URL}/offers/user/${userId}`);
      return response.json();
    }
    await simulateDelay();
    return { success: true, result: offers.filter(o => o.buyerId === userId || o.sellerId === userId) };
  },
};

// ============ RESERVATION SERVICE ============
export const reservationService = {
  async create(reservationData: Partial<Reservation>) {
    if (DATA_SOURCE === 'api') {
      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData),
      });
      return response.json();
    }
    await simulateDelay();
    const newReservation: Reservation = {
      id: `r${Date.now()}`,
      listingId: reservationData.listingId || '',
      buyerId: reservationData.buyerId || '',
      depositAmount: reservationData.depositAmount || 0,
      status: 'PENDING',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    };
    return { success: true, result: newReservation, message: 'Reservation created' };
  },

  async getByUser(userId: string) {
    if (DATA_SOURCE === 'api') {
      const response = await fetch(`${API_BASE_URL}/reservations/user/${userId}`);
      return response.json();
    }
    await simulateDelay();
    return { success: true, result: reservations.filter(r => r.buyerId === userId) };
  },
};

// ============ DEALER SERVICE ============
export const dealerService = {
  async getAll() {
    if (DATA_SOURCE === 'api') {
      const response = await fetch(`${API_BASE_URL}/dealers`);
      return response.json();
    }
    await simulateDelay();
    return { success: true, result: dealers };
  },

  async getById(id: string) {
    if (DATA_SOURCE === 'api') {
      const response = await fetch(`${API_BASE_URL}/dealers/${id}`);
      return response.json();
    }
    await simulateDelay();
    return { success: true, result: dealers.find(d => d.id === id) || null };
  },
};

// ============ AUTH SERVICE ============
export const authService = {
  async login(email: string, password: string) {
    if (DATA_SOURCE === 'api') {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await handleApiError(response);
      // Store token in localStorage
      if (data.success && data.data?.token) {
        localStorage.setItem('auth_token', data.data.token);
      }
      return data;
    }
    await simulateDelay();
    const user = users.find(u => u.email === email);
    if (user) {
      const token = `mock-token-${user.id}`;
      localStorage.setItem('auth_token', token);
      return { success: true, data: { user, token }, message: 'Login successful' };
    }
    return { success: false, data: null, error: 'Invalid credentials' };
  },

  async register(userData: { email: string; phone: string; fullName: string; password: string; role?: string }) {
    if (DATA_SOURCE === 'api') {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await handleApiError(response);
      // Store token in localStorage
      if (data.success && data.data?.token) {
        localStorage.setItem('auth_token', data.data.token);
      }
      return data;
    }
    await simulateDelay();
    // Mock registration
    const newUser = {
      id: `u${users.length + 1}`,
      ...userData,
      role: userData.role || 'BUYER',
      emailVerified: false,
      phoneVerified: false,
      identityVerified: false,
      createdAt: new Date().toISOString(),
    };
    const token = `mock-token-${newUser.id}`;
    localStorage.setItem('auth_token', token);
    return { success: true, data: { user: newUser, token }, message: 'Registration successful' };
  },

  async getMe() {
    if (DATA_SOURCE === 'api') {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: getAuthHeaders(),
      });
      return handleApiError(response);
    }
    await simulateDelay();
    // Mock: return first user
    return { success: true, data: users[0] };
  },

  logout() {
    localStorage.removeItem('auth_token');
  },

  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  },
};

// ============ USER SERVICE ============
export const userService = {
  async getById(id: string) {
    if (DATA_SOURCE === 'api') {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        headers: getAuthHeaders(),
      });
      return handleApiError(response);
    }
    await simulateDelay();
    return { success: true, result: getUserById(id) || null };
  },
};

// ============ PAYMENT SERVICE ============
export const paymentService = {
  async create(paymentData: Partial<Payment>) {
    if (DATA_SOURCE === 'api') {
      const response = await fetch(`${API_BASE_URL}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });
      return response.json();
    }
    await simulateDelay();
    const newPayment: Payment = {
      id: `p${Date.now()}`,
      userId: paymentData.userId || '',
      amount: paymentData.amount || 0,
      purpose: paymentData.purpose || '',
      status: 'SUCCEEDED',
      provider: paymentData.provider || 'ESEWA',
      reference: `REF-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    return { success: true, result: newPayment, message: 'Payment processed' };
  },
};

export const getDataMode = () => DATA_SOURCE;
export const isApiMode = () => DATA_SOURCE === 'api';
export const isMockMode = () => DATA_SOURCE === 'mock';

export default {
  vehicle: vehicleService,
  listing: listingService,
  passport: passportService,
  inspection: inspectionService,
  offer: offerService,
  reservation: reservationService,
  dealer: dealerService,
  user: userService,
  payment: paymentService,
};
